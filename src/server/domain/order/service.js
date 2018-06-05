import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import promiseRetry from 'promise-retry';
import schema from './schema';
import BaseService from '../base-service';
import TenantService from '../tenant/service';
import KitchenService from '../kitchen/service';
import pipeline from '../../libs/pipeline';

export default class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  getToday() {
    let fromDate = moment().utcOffset(4).startOf('day').toDate()
    let toDate = moment().utcOffset(4).endOf('day').toDate()

    let query = {
      createdAt: {
        $lte: toDate,
        $gte: fromDate
      },
      isDeleted: {
        $ne: true
      }
    };

    return this.find(query);
  }

  create(data) {
    if (!data) throw new Error('Missing data');
    if (!data.items) throw new Error('Missing items');
    if (data.items.length === 0) throw new Error('Missing items');

    let doCreate = () => {
      let order;
      let tenant;

      let doGetTenant = () => {
        return new TenantService(this._ctx)
          .findById(this._ctx.user.tenant._id)
          .then(result => {
            tenant = result
          })
      }
      
      let doGenerateCode = () => {
        data.code = this._generateCode(this._ctx.user.tenant.code);
        data.ref = data.code.slice(-4);
      }

      let doCalculate = () => {
        let subtotal = 0;
        let discount = 0;
        let total = 0;
        let extraTotal = 0;

        data.items.forEach(item => {
          item.subtotal = _.round(item.quantity * item.unitPrice, 2);
          item.total = _.round(item.subtotal - (item.discount || 0), 2);

          if (item.extra && item.extra.length > 0) {
            item.extra.forEach(extra => {
              extra.subtotal = _.round(extra.quantity * extra.unitPrice, 2);
              extra.total = _.round(extra.subtotal - (extra.discount || 0), 2);
              extraTotal += extra.total;
            });
          }

          subtotal += item.subtotal;
          discount += item.discount;
          total += item.total;
        });

        data.subtotal = subtotal;
        data.discount = discount;
        data.isInclusiveGST = tenant.settings.isInclusiveGST;
        if (tenant.settings.isInclusiveGST) {
          data.total = total + extraTotal;
          data.tax = _.round(0.11 * total, 2);
        } else {
          data.tax = _.round(0.11 * total, 2);
          data.total = total + extraTotal + data.tax;
        }
      }

      let doSave = () => {
        return super.create(data)
          .then(result => {
            order = result;
          })   
      }

      let doCreateKitchen = () => {
        let doCreateKitchenItem = (item) => {
          return new KitchenService(this._ctx)
            .create({
              tenant: order.tenant,
              orderId: order._id,
              orderCode: order.code,
              orderRef: order.ref,
              itemId: item._id,
              name: item.name,
              quantity: item.quantity,
              category: item.category,
              extra: item.extra,
              note: item.note,
              isTakeaway: item.isTakeaway
            })
        }

        return Promise.each(order.items, doCreateKitchenItem);
      }

      let doReturn = () => {
        return order;
      }

      return pipeline([
        doGetTenant,
        doGenerateCode,
        doCalculate,
        doSave,
        doCreateKitchen,
        doReturn
      ])
    }

    return promiseRetry(doCreate, {retries: 3})
  }  

  _generateCode(code) {
    let timestamp = new Date().getTime().toString().slice(-4);
    return `${code}${moment().format("YYMMDD")}${timestamp}`
  }
}
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import promiseRetry from 'promise-retry';
import schema from './schema';
import BaseService from '../base-service';
import KitchenService from '../kitchen/service';
import pipeline from '../../libs/pipeline';

export default class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  getToday() {
    let query = {
      createdAt: {
        $lte: new Date()
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

      let doGenerateCode = () => {
        data.code = this._generateCode(this._ctx.user.tenant.code);
        data.ref = data.code.slice(-4);
      }

      let doCalculate = () => {
        let subtotal = 0;
        let discount = 0;
        let total = 0;

        data.items.forEach(item => {
          item.subtotal = item.quantity * item.unitPrice;
          item.discount = 0;
          item.total = item.subtotal - item.discount;

          subtotal += item.subtotal;
          discount += item.discount;
          total += item.total;
        });

        data.subtotal = subtotal;
        data.discount = discount;
        data.tax = 0.11 * total;
        data.total = total + data.tax;
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
              note: item.note
            })
        }

        return Promise.each(order.items, doCreateKitchenItem);
      }

      let doReturn = () => {
        return order;
      }

      return pipeline([
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
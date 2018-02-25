import _ from 'lodash';
import promiseRetry from 'promise-retry';
import schema from './schema';
import BaseService from '../base-service';
import pipeline from '../../libs/pipeline';

export default class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  create(data) {
    if (!data) throw new Error('Missing data');
    if (!data.items) throw new Error('Missing items');
    if (data.items.length === 0) throw new Error('Missing items');

    let doCreate = () => {
      let doGenerateCode = () => {
        data.code = this._generateCode(this._ctx.user.tenant.code);
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
        return super.create(data);   
      }

      return pipeline([
        doGenerateCode,
        doCalculate,
        doSave
      ])
    }

    return promiseRetry(doCreate, {retries: 3})
  }  

  _generateCode(code) {
    let timestamp = new Date().getTime().toString().slice(-4);
    let year = new Date().getFullYear().toString().slice(-2);
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    return `${code}-${day}${month}${year}-${timestamp}`
  }
}
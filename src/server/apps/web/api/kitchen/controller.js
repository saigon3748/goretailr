import _ from 'lodash';
import Promise from 'bluebird';
import BaseController from '../base-controller';
import Domain from '../../../../domain';
import pipeline from '../../../../libs/pipeline';

export default class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.KitchenService);
  }

  getToday() {
    return this._service.getToday();
  }

  markCompleted() {
    return this._service.markCompleted(this._ctx.req.body);    
  }

  markUncompleted() {
    return this._service.markUncompleted(this._ctx.req.body);    
  }
}
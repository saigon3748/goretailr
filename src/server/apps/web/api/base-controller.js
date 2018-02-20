import _ from 'lodash';
import Promise from 'bluebird';
import QueryHelper from '../../../infra/utils/query-helper';

export default class BaseController {
  constructor(ctx, service) {
    this._ctx = ctx;
    this._service = service(ctx);
  }

  find() {
    let result = QueryHelper.parseUrl(this._ctx.req.url);
    return this._service.find(result.query, result.options);
  }

  findById() {
    return this._service.findById(this._ctx.req.params.id);
  }

  create() {
    return this._service.create(this._ctx.req.body);
  }

  updateById() {
    return this._service.updateById(this._ctx.req.params.id, this._ctx.req.body);
  }

  deleteById() {
    return this._service.deleteById(this._ctx.req.params.id);
  }
}

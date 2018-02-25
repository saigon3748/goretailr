import _ from 'lodash';
import schema from './schema';
import BaseService from '../base-service';

export default class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }
}
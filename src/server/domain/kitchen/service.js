import _ from 'lodash';
import moment from 'moment';
import promiseRetry from 'promise-retry';
import schema from './schema';
import BaseService from '../base-service';
import pipeline from '../../libs/pipeline';

export default class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  getToday() {
    let query = {
      createdAt: {
        $lte: new Date()
      }
    };

    return this.find(query);
  }
}
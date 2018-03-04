import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
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
      },
      isCompleted: {
        $ne: true
      }      
    };

    return this.find(query);
  }

  markCompleted(ids) {
    let doMarkItemCompleted = (id) => {
      return this.updateById(id, {
        isCompleted: true
      })
    }

    return Promise.each(ids, doMarkItemCompleted);
  }

  markUncompleted(ids) {
    let doMarkItemUncompleted = (id) => {
      return this.updateById(id, {
        isCompleted: false
      })
    }

    return Promise.each(ids, doMarkItemUncompleted);
  }
}
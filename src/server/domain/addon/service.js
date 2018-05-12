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

  find() {
    return new Promise((resolve, reject) => {
      resolve([
        { _id: '5aa4e913841ad9252b16f0a5', name: 'extra chicken', unitPrice: 3 }, 
        { _id: '5aa4e913841ad9252b16f0a6', name: 'sanagaki soldier', unitPrice: 5 }, 
        { _id: '5aa4e913841ad9252b16f0a7', name: 'extra miles', unitPrice: 2 }
      ]);
    })
  }
}
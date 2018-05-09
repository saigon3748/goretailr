import _ from 'lodash';
import Promise from 'bluebird';
import BaseController from '../base-controller';
import Domain from '../../../../domain';
import pipeline from '../../../../libs/pipeline';

export default class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.CategoryService);
  }

  find() {
    return new Promise((resolve, reject) => {
      resolve([
        { _id: 1, amount: 5 }, 
        { _id: 2, amount: 10 }, 
        { _id: 3, amount: 20 }, 
        { _id: 4, amount: 50 }, 
        { _id: 5, amount: 100 }, 
        { _id: 6, amount: 200 }, 
        { _id: 7, amount: 500 }
      ]);
    })
  }  
}
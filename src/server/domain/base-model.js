import _ from 'lodash';

export default class BaseModel {
  constructor(data){
    if (_.hasIn(data, 'toJSON')) {
      _.extend(this, data.toJSON());
    } else {
      _.extend(this, data);
    }
  }
}
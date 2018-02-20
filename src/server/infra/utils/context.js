import _ from 'lodash';
import Promise from 'bluebird';
import User from '../../domain/user';

export default class Context {
  constructor(user, req) {
    this.user = new User.Model(user);
    this.req = req;
  }
}
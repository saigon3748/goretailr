import _ from 'lodash';
import Promise from 'bluebird';
import bscrypt from 'bcryptjs';
import BaseModel from '../base-model';

export default class User extends BaseModel {
  constructor(data) {
    super(data);
  }

  get isSudo() {
    return this.username === "sudo"
  }
}
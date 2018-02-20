import _ from 'lodash';
import Promise from 'bluebird';
import jwt from 'jwt-simple';
import bscrypt from 'bcryptjs';
import basicAuth from 'basic-auth';
import BaseController from '../base-controller';
import Domain from '../../../../domain';
import pipeline from '../../../../libs/pipeline';

export default class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.UserService);
  }

  login() {
    let data = {};
    let credentials = basicAuth(this._ctx.req);

    let doGetUser = () => {
      return this._service.findOne({username: credentials.name})
        .then(user => {
          data.user = user;
        })
    }

    let doLogin = () => {
      if (!data.user) {
        return { error: 'User not found.' };
      }

      if (data.user.isLocked) {
        return { error: 'User is locked.' };
      }

      if (!bscrypt.compareSync(credentials.pass, data.user.password)) {
        return { error: 'Incorrect username or password.' };
      }

      return { token: this._generateToken(data.user) };
    }

    return pipeline([
      doGetUser,
      doLogin
    ])
  }

  _generateToken(user) {
    let payload = {
      _id: user._id,
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      tenant: user.tenant,
      exp: Math.floor(Date.now() / 1000) + (10 * 60 * 60)      
    }

    return jwt.encode(payload, "noel");
  }  
}
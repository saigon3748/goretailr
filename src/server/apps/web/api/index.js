import _ from 'lodash';
import express from 'express';
import AuthApi from './auth';
import TenantApi from './tenant';
import UserApi from './user';
import MenuApi from './menu';
import OrderApi from './order';

export default express.Router()
  .use('/auth', AuthApi)  
  .use('/tenants', TenantApi)  
  .use('/users', UserApi)
  .use('/menus', MenuApi)
  .use('/orders', OrderApi)


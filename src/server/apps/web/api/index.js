import _ from 'lodash';
import express from 'express';
import AuthApi from './auth';
import TenantApi from './tenant';
import UserApi from './user';
import MenuApi from './menu';
import CategoryApi from './category';
import OrderApi from './order';
import KitchenApi from './kitchen';

export default express.Router()
  .use('/auth', AuthApi)  
  .use('/tenants', TenantApi)  
  .use('/users', UserApi)
  .use('/menus', MenuApi)
  .use('/categories', CategoryApi)
  .use('/orders', OrderApi)
  .use('/kitchens', KitchenApi)


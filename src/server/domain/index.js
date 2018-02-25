import _ from 'lodash';
import Tenant from './tenant';
import User from './user';
import Menu from './menu';
import Category from './category';
import Order from './order';

export default class Domain {
  static Tenant(data) {
    return new Tenant.Model(data);
  }

  static TenantService(ctx) {
    return new Tenant.Service(ctx);
  }

  static User(data) {
    return new User.Model(data);
  }

  static UserService(ctx) {
    return new User.Service(ctx);
  }

  static Menu(data) {
    return new Menu.Model(data);
  }

  static MenuService(ctx) {
    return new Menu.Service(ctx);
  }

  static Category(data) {
    return new Category.Model(data);
  }

  static CategoryService(ctx) {
    return new Category.Service(ctx);
  }

  static Order(data) {
    return new Order.Model(data);
  }

  static OrderService(ctx) {
    return new Order.Service(ctx);
  }
}


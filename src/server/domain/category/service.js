import _ from 'lodash';
import pipeline from '../../libs/pipeline';
import schema from './schema';
import BaseService from '../base-service';

export default class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  findTop() {
    return this.find({parent: { $exists: false }});
  } 

  create(data) {
    if (!data) throw new Error('Missing data');
    let category;

    let doCreate = () => {
      return super.create({
        name: data.name,
        displayIndex: data.displayIndex || 1
      }).then(result => {
        category = result;
      })
    }

    let doCreateSubs = () => {
      let doCreateSub = (sub) => {
        return super.create({
          parent: category._id,
          name: sub.name,
          displayIndex: sub.displayIndex || 1,
          path: [...category.path, category._id ]
        }).then(result => {
          sub._id = result._id;
        })        
      }

      return Promise.all(_.map(data.subs, sub => doCreateSub(sub)))
    }

    let doUpdate = () => {
      return super.updateById(category._id, {
        subs: data.subs
      })
    }

    return pipeline([
      doCreate,
      doCreateSubs,
      doUpdate
    ]);
  }

  updateById(id, data) {
    if (!id) throw new Error('Missing id');
    if (!data) throw new Error('Missing data');
    let category;

    let doGetCategory = () => {
      return super.findById(id)
      .then(result => {
        category = result;
      })
    }

    let doUpdateSubs = () => {
      let doUpdateSub = (sub) => {
        return super.updateById(sub._id, {
          name: sub.name,
          displayIndex: sub.displayIndex || 1
        })
      }

      let subs = _.filter(data.subs, item => {
        return item._id && !item.isDeleted
      })

      return Promise.all(_.map(subs, sub => doUpdateSub(sub)))
    }

    let doCreateSubs = () => {
      let doCreateSub = (sub) => {
        return super.create({
          parent: category._id,
          name: sub.name,
          displayIndex: sub.displayIndex || 1,
          path: [...category.path, category._id ]
        }).then(result => {
          sub._id = result._id;
        })
      }

      let subs = _.filter(data.subs, item => {
        return !item._id && !item.isDeleted
      })

      return Promise.all(_.map(subs, sub => doCreateSub(sub)))
    }

    let doDeleteSubs = () => {
      let doDeleteSub = (sub) => {
        return this.deleteById(sub._id);     
      }

      let subs = _.filter(data.subs, item => {
        return item._id && item.isDeleted
      })

      return Promise.all(_.map(subs, sub => doDeleteSub(sub)))
    }

    let doUpdate = () => {
      let subs = _.filter(data.subs, item => {
        return item._id && !item.isDeleted
      })

      return super.updateById(category._id, {
        subs: subs
      })
    }

    return pipeline([
      doGetCategory,
      doUpdateSubs,
      doCreateSubs,
      doDeleteSubs,
      doUpdate
    ]);
  }

  deleteById(id) {
    if (!id) throw new Error('Missing id');
    let category;
    let subs = []

    let doGetCategory = () => {
      return super.findById(id)
      .then(result => {
        category = result;
      })
    }

    let doGetSubs = () => {
      return super.find({
        path: {
          $elemMatch: {
            $eq: category._id
          }
        }
      })
      .then(result => {
        subs = result;
      })
    }

    let doDeleteSubs = () => {
      let doDeleteSub = (sub) => {
        return super.deleteById(sub._id);     
      }

      return Promise.all(_.map(subs, sub => doDeleteSub(sub)))
    }

    let doDelete = () => {
      return super.deleteById(category._id);
    }

    return pipeline([
      doGetCategory,
      doGetSubs,
      doDeleteSubs,
      doDelete
    ]);
  }  
}
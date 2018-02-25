import _ from 'lodash';
import bscrypt from 'bcryptjs';
import mongoose from 'mongoose';
import audit from '../audit';
import paginate from 'mongoose-paginate';

let schema = mongoose.Schema({
  tenant: {
    type: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'tenants' },
      code: { type: String, required: true },
      name: { type: String, required: true }
    }, { _id: false })
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  path: [ { type: mongoose.Schema.Types.ObjectId, ref: 'categories' } ],
  name: { type: String, required: true },
  displayIndex: { type: Number, default: 1 },
  subs: [ 
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
      name: { type: String, required: true },
      displayIndex: { type: Number, default: 1 }
    }, { _id: false })
  ]
})

schema.plugin(audit);
schema.plugin(paginate);

export default mongoose.model('categories', schema)
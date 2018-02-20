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
  code: { type: String, required: true, unique: true, uppercase: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, required: true, default: 0 },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  note: { type: String },
  line_items: [
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit_price: { type: Number, required: true },
      subtotal: { type: Number, required: true },
      discount: { type: Number, required: true, default: 0 },
      total: { type: Number, required: true },
      tags: [ { type: String } ],
      note: { type: String }
    }, { _id: false })
  ]  
})

schema.index({"code": "text", "note": "text", "line_items.name": "text", "line_items.note": "text", "line_items.tags": "text"})

schema.plugin(audit);
schema.plugin(paginate);

export default mongoose.model('orders', schema)
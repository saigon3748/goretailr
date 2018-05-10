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
  ref: { type: String, required: true, uppercase: true },
  subtotal: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0 },
  discountAmt: { type: Number, required: true, default: 0 },
  tax: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  cash: { type: Number },
  change: { type: Number },
  note: { type: String },
  items: [
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 },
      unitPrice: { type: Number, required: true, default: 0 },
      subtotal: { type: Number, required: true, default: 0 },
      discount: { type: Number, required: true, default: 0 },
      isPercentDiscount: { type: Boolean, required: true, default: false },
      total: { type: Number, required: true, default: 0 },
      extra: [ 
        mongoose.Schema({
          name: { type: String, required: true },
          amount: { type: Number, default: 0 }
        }, { _id: false })
      ],      
      category: mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
        name: { type: String, required: true }
      }, { _id: false }),
      note: { type: String },
      isTakeaway: { type: Boolean, default: false }
    }, { _id: false })
  ],
  table: { type: String },
  isTakeaway: { type: Boolean, default: false },  
  isDeleted: { type: Boolean, default: false }  
})

schema.index({"code": "text", "note": "text", "items.name": "text", "items.note": "text", "items.category.name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

export default mongoose.model('orders', schema)
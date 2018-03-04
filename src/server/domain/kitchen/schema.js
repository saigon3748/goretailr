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
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
  orderCode: { type: String, required: true },
  orderRef: { type: String, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  category: mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    name: { type: String, required: true }
  }, { _id: false }),
  note: { type: String },
  isCompleted: { type: Boolean, required: true, default: false }
})

schema.index({"orderCode": "text", "orderRef": "text", "name": "text", "note": "text", "category.name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

export default mongoose.model('kitchens', schema)
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
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  isPercentDiscount: { type: Boolean, default: false },
  isPriceEditable: { type: Boolean, default: false },
  category: mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    name: { type: String, required: true }
  }, { _id: false }),
  image: { type: String },
  isLocked: { type: Boolean, default: false }  
})

schema.index({"name": "text", "category.name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

export default mongoose.model('menus', schema)
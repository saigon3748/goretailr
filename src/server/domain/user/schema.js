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
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  isManager: { type: Boolean, required: true, default: false },
  isLocked: { type: Boolean, required: true, default: false },
  lastLogin: { type: Date, default: Date.now }
})

schema.index({"username": "text", "name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

schema.pre('save', function (next) {
  this.lastLogin = Date.now();

  if (!this.isModified('password') && !this.isNew) return next();
  this.password = bscrypt.hashSync(this.password);
  next();
});

export default mongoose.model('users', schema)
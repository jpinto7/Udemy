import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { isEmail } from 'validator';

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: "Email can't be blank",
    validate: {
      validator: value => isEmail(value),
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: [8, 'Password must be at least 8 characters'],
    required: "Password can't be blank",
  },
});

schema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

export default mongoose.model('user', schema);

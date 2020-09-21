import mongoose from 'mongoose';
import argon2 from 'argon2';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const passwordHashed = await argon2.hash(user.password);
    user.password = passwordHashed;
    next();
  } catch (err) {
    return next(err);
  }
});

export default mongoose.model('User', userSchema);

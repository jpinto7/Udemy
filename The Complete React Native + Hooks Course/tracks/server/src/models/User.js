const mongoose = require('mongoose');
const argon2 = require('argon2');
const { randomBytes } = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  const salt = randomBytes(32);
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const passwordHashed = await argon2.hash(user.password, { salt });
    user.password = passwordHashed;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise(async (resolve, reject) => {
    const correctPassword = await argon2.verify(
      user.password,
      candidatePassword
    );
    if (!correctPassword) {
      return reject(false);
    }
    return resolve(true);
  });
};

mongoose.model('User', userSchema);

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization && authorization.split(' ')[0] === 'Bearer')) {
    return res.status(401).send({
      error: 'You must be logged in.',
    });
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({
        error: 'You must be logged in.',
      });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};

module.exports = requireAuth;

const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const Todo = require('../../models/todo');
const User = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'info@test.com',
    password: 'elmasloco',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userOneId.toHexString(),
        access: 'auth'
      }, process.env.JWT_SECRET).toString()
    }]
  },
  {
    _id: userTwoId,
    email: 'info2@test.com',
    password: 'elmasloco2',
    tokens: [{
      access: 'auth',
      token: jwt.sign({
        _id: userTwoId.toHexString(),
        access: 'auth'
      }, process.env.JWT_SECRET).toString()
    }]    
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First text todo',
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'Second text todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => Todo.insertMany(todos))
    .then(() => done());
};

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = {
  populateTodos,
  populateUsers,
  todos,
  users
};
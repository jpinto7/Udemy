const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

require('./config/config');
const Todo = require('./models/todo');
const User = require('./models/user');
const authenticate = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const body = _.pick(req.body, ['text']);
  body._creator = req.user._id;
  const todo = new Todo(body);
  todo.save().then(doc => {
    res.send(doc);
  }).catch(e => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id }).then(todos => {
    res.send({ todos });
  }).catch(e => {
    res.status(400).send(e);
  });
});

app.get('/todo/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({ _id: id, _creator: req.user._id }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(e => {
    res.status(400).send(e);
  });
});

app.delete('/todo/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({ _id: id, _creator: req.user._id }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(e => {
    res.status(400).send(e);
  });
});

app.patch('/todo/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(e => {
    res.status(400).send(e);
  });
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
  })
  .then(token => {
    res.header('x-auth', token).send(user);
  })
  .catch(e => {
    res.status(400).send(e);
  });
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);       
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });    
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(e => {
      res.status(400).send(e);
    });    
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

if (!module.parent) {
  app.listen(process.env.PORT, () => {
    console.log('Started on port 3000');
  });  
}

module.exports = {
  app
};
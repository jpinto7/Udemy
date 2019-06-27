const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const Todo = require('../models/todo');
const User = require('../models/user');
const { todos, users, populateTodos, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Todo text';
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      });    
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
  });
});

describe('GET /todo/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todo/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should not return todo doc created by other user', done => {
    request(app)
      .get(`/todo/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todo/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
  it('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todo/1234abcd`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  }); 
});

describe('DELETE /todo/:id', () => {
  it('should remove a todo', done => {
    request(app)
      .delete(`/todo/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todos[0]._id.toHexString())
          .then(todo => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should not remove a todo created by other user', done => {
    request(app)
      .delete(`/todo/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todos[0]._id.toHexString())
          .then(todo => {
            expect(todo).toBeTruthy();
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .delete(`/todo/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
  it('should return 404 for non-object ids', done => {
    request(app)
      .delete(`/todo/1234abcd`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  }); 
});

describe('PATCH /todo/:id', () => {
  it('should update a todo', done => {
    const body = { 
      text: 'Loco mi loco',
      completed: true
    };
    request(app)
      .patch(`/todo/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .send(body)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should not update a todo created by other user', done => {
    const body = { 
      text: 'Loco mi loco',
      completed: true
    };
    request(app)
      .patch(`/todo/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .send(body)
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todos[0]._id.toHexString())
          .then(todo => {
            expect(todo.text).toBe(todos[0].text);
            expect(todo.completed).toBe(todos[0].completed || false);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should clear completedAt when todo is not completed', done => {
    const body = { 
      text: 'Loco mi loquillo',
      completed: false
    };
    request(app)
      .patch(`/todo/${todos[1]._id.toHexString()}`)
      .set('x-auth', users[1].tokens[0].token)
      .send(body)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .patch(`/todo/${new ObjectID().toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
  
  it('should return 404 for non-object ids', done => {
    request(app)
      .patch(`/todo/1234abcd`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  }); 
});

describe('GET /users/me', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })      
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', done => {
    const user = {
      email: 'info3@test.com',
      password: '123456'
    };
    request(app)
      .post('/users')
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200)
      .expect(res => {
        expect(res.header['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(user.email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findOne({ email: user.email })
          .then(u => {
            expect(u).toBeTruthy();
            expect(u.password).not.toBe(user.password);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return validation errors if request invalid', done => {
    request(app)
      .post('/users')
      .send({
        email: 'info4@test',
        password: '123'
      })
      .expect(400)    
      .end(done);
  });

  it('should not create user if email in use', done => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: '123456'
      })
      .expect(400)    
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.header['x-auth']).toBeTruthy();
        expect(res.body._id).toBe(users[1]._id.toHexString());
        expect(res.body.email).toBe(users[1].email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id)
          .then(u => {
            expect(u.tokens.length).toBe(2);
            expect(u.tokens[1]).toMatchObject({
              access: 'auth',
              token: res.header['x-auth']
            });
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should reject invalid login', done => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect(res => {
        expect(res.header['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[1]._id)
          .then(u => {
            expect(u.tokens.length).toBe(1);
            done();
          })
          .catch(err => done(err));
      });
    });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', done => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.header['x-auth']).toBeFalsy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        User.findById(users[0]._id)
          .then(u => {
            expect(u.tokens.length).toBe(0);
            done();
          })
          .catch(err => done(err));
      });
  });
});
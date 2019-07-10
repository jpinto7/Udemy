const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

console.log('Connecting to MongoDB...');

mongoose.connect('mongodb://localhost:27017/myTodoApp', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const handleError = function(err) {
  console.error(err);
};

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
});

todoSchema.statics.all = function(callback) {
  return Todo.find({}, (err, todos) => {
    callback({ todos });
  });
}

todoSchema.statics.createDocument = function(params, callback) {
  return Todo.create(params, (err, todo) => {
    if (err) return handleError(err);
    callback({ todo });
  });
}

todoSchema.statics.updateDocument = function(id, params, callback) {
  return Todo.findOneAndUpdate({ _id: id }, params, (err, todo) => {
    if (err) return handleError(err);
    callback({ todo });
  });
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

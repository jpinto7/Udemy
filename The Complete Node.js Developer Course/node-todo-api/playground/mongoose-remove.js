const mongoose = require('../server/db/mongoose');
const Todo = require('../server/models/todo');

const id = "5c00db98b387794521f92567";

if (!mongoose.Types.ObjectId.isValid(id)) {
  console.log('object id not valid', id);
}

/* Todo.find({
  _id: id
}).then(doc => {
  console.log(doc);
}).catch(e => {
  console.log('Error', e);
});

Todo.findOne({
  _id: id
}).then(doc => {
  console.log(doc);
}).catch(e => {
  console.log('Error', e);
}); */

Todo.findById(id).then(doc => {
  console.log(doc);
}).catch(e => {
  console.log('Error', e);
});
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server', err);
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Todos').find({ completed: false }).toArray()
    .then(docs => {
      console.log(JSON.stringify(docs, undefined, 2));
    })
    .catch(err => {
      console.log('Error', err);
    });
  client.close();
});
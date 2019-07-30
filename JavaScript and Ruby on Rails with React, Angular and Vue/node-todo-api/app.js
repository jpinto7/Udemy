const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

const Todo = require('./todo');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
});

app.use(express.static('public'));

app.use(bodyParser.json())

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/todos', (req, res) => {
  Todo.all(data => {
    res.json(data);
  });
});

router.post('/todos', (req, res) => {
  Todo.createDocument(req.body, data => {
    res.json(data);
  });
});

router.put('/todos/:todo_id', (req, res) => {
  Todo.updateDocument(req.params.todo_id, req.body, data => {
    res.json(data);
  });
});

app.use('/', router);

app.listen(3000, () => {
  console.log('Server running...');
});

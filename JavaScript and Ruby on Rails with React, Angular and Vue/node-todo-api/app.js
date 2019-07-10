const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(bodyParser.json())

const Todo = require('./todo');

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

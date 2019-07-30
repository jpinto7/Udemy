var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Todo = function (_React$Component) {
	_inherits(Todo, _React$Component);

	function Todo(props) {
		_classCallCheck(this, Todo);

		var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));

		_this.handleInputChange = function (event) {
			var target = event.target;
			var value = target.type === 'checkbox' ? target.checked : target.value;
			var name = target.name;

			_this.setState(_defineProperty({}, name, value), function (event) {
				if (target.type === 'checkbox') {
					_this.handleSubmit(event);
				}
			});
		};

		_this.handleSubmit = function (event) {
			var id = _this.props.id || _this.state._id;
			if (id == "" || id == undefined) {
				fetch('/todos', {
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						text: _this.state.todoText,
						done: _this.state.isDone
					})
				}).then(function (response) {
					return response.json();
				}).then(function (_ref) {
					var todo = _ref.todo;

					console.log('todo', todo);
					_this.setState({ _id: todo._id });
				}).catch(function (error) {
					console.log(error);
				});
			} else {
				fetch('/todos/' + id, {
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						text: _this.state.todoText,
						done: _this.state.isDone
					})
				}).catch(function (error) {
					console.log(error);
				});
			}
		};

		_this.state = {
			isDone: props.checked === "true" || props.checked === true,
			todoText: props.text
		};
		return _this;
	}

	_createClass(Todo, [{
		key: 'render',
		value: function render() {
			var _state = this.state,
			    isDone = _state.isDone,
			    todoText = _state.todoText;

			return React.createElement(
				'div',
				{ className: 'todo' },
				React.createElement(
					'span',
					null,
					React.createElement('input', { name: 'isDone',
						type: 'checkbox',
						checked: isDone,
						onClick: this.handleInputChange }),
					React.createElement('input', {
						name: 'todoText',
						type: 'text',
						className: this.state.isDone ? 'done' : 'not-done',
						value: todoText,
						onChange: this.handleInputChange,
						onBlur: this.handleSubmit })
				)
			);
		}
	}]);

	return Todo;
}(React.Component);

var TodoList = function (_React$Component2) {
	_inherits(TodoList, _React$Component2);

	function TodoList(props) {
		_classCallCheck(this, TodoList);

		var _this2 = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

		_this2.newTodo = function (e) {
			e.preventDefault();
			_this2.setState({
				todos: [].concat(_toConsumableArray(_this2.state.todos), [{
					id: ""
				}])
			});
		};

		_this2.state = {
			todos: []
		};
		return _this2;
	}

	_createClass(TodoList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			fetch('/todos').then(function (response) {
				return response.json();
			}).then(function (_ref2) {
				var todos = _ref2.todos;

				_this3.setState({
					todos: todos
				});
			}).catch(function (error) {
				console.log(error);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var todoList = this.state.todos.map(function (todo) {
				return React.createElement(Todo, {
					id: todo._id,
					key: todo._id,
					checked: todo.done,
					text: todo.text
				});
			});

			return React.createElement(
				React.Fragment,
				null,
				todoList,
				React.createElement(
					'button',
					{ onClick: this.newTodo },
					'New Todo'
				)
			);
		}
	}]);

	return TodoList;
}(React.Component);

ReactDOM.render(React.createElement(TodoList, null), document.getElementById('root'));

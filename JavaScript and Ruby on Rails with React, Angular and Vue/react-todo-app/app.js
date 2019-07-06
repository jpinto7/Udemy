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

			_this.setState(_defineProperty({}, name, value), function () {
				_this.handleSubmit();
			});
		};

		_this.handleSubmit = function () {
			console.log('Submitting..', _this.state);
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
						onChange: this.handleInputChange }),
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
			todos: [{ id: 1, text: "Item 1", done: false }, { id: 2, text: "Item 2", done: false }, { id: 3, text: "Item 3", done: false }, { id: 4, text: "Item 4", done: false }]
		};
		return _this2;
	}

	_createClass(TodoList, [{
		key: 'render',
		value: function render() {
			var todoList = this.state.todos.map(function (todo) {
				return React.createElement(Todo, Object.assign({ key: todo.id.toString() }, todo));
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
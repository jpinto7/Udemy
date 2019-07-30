class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDone: props.checked === "true" || props.checked === true,
			todoText: props.text
		};
	}

	handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, event => {
			if (target.type === 'checkbox') {
				this.handleSubmit(event);
			}
		});
  }

	handleSubmit = event => {
		const id = this.props.id || this.state._id;
		if (id == "" || id == undefined) {
			fetch('http://localhost:3000/todos', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: this.state.todoText,
					done: this.state.isDone
				})
			})
				.then(response => response.json())
				.then(({ todo }) => {
					console.log('todo', todo);
					this.setState({ _id: todo._id });
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			fetch(`http://localhost:3000/todos/${id}`, {
				method: 'put',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					text: this.state.todoText,
					done: this.state.isDone
				})
			})
				.catch(error => {
					console.log(error);
				});
		}
	}

	render() {
		const { isDone, todoText } = this.state;
		return (
			<div className="todo">
				<span>
					<input name="isDone"
						type="checkbox"
						checked={isDone}
						onClick={this.handleInputChange} />
					<input
						name="todoText"
						type="text"
						className={this.state.isDone ? 'done' : 'not-done'}
						value={todoText}
						onChange={this.handleInputChange}
						onBlur={this.handleSubmit} />
				</span>
			</div>
		);
	}
}

class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
	}

	componentDidMount() {
		fetch('http://localhost:3000/todos')
			.then(response => response.json())
			.then(({ todos }) => {
				this.setState({
					todos
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	newTodo = e => {
		e.preventDefault();
		this.setState({
			todos: [...this.state.todos, {
				id: ""
			}]
		});
	}

	render() {
		const todoList = this.state.todos.map(todo => (
			<Todo
				id={todo._id}
				key={todo._id}
				checked={todo.done}
				text={todo.text}
			/>
		));

		return (
			<React.Fragment>
				{todoList}
				<button onClick={this.newTodo}>New Todo</button>
			</React.Fragment>
		)
	}
}

ReactDOM.render(
	<TodoList />,
	document.getElementById('root'));

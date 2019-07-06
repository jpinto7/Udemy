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
    }, () => {
			this.handleSubmit();
		});
  }

	handleSubmit = () => {
		console.log('Submitting..', this.state);
	}

	render() {
		const { isDone, todoText } = this.state;
		return (
			<div className="todo">
				<span>
					<input name="isDone"
						type="checkbox"
						checked={isDone}
						onChange={this.handleInputChange} />
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
			todos: [
				{id: 1, text: "Item 1", done: false},
				{id: 2, text: "Item 2", done: false},
				{id: 3, text: "Item 3", done: false},
				{id: 4, text: "Item 4", done: false}
			]
		};
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
			<Todo key={todo.id.toString()} {...todo} />
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

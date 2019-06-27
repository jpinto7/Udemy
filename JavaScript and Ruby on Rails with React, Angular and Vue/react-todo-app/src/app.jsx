class Todo extends React.Component {
	render() {
		const { checked } = this.props;
		return (
			<div className="todo">
				<span>
					<input type="checkbox" checked={checked}/>
					<input type="text"/>
				</span>
			</div>
		);
	}
}

ReactDOM.render(
	<h1>Hello</h1>,
	document.getElementById('root'));
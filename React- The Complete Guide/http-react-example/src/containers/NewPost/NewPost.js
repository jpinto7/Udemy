import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max',
    submitted: false,
  }

  postDataHandler = () => {
    const { author, title, content } = this.state;
    const post = {
      title,
      content,
      author
    };
    axios.post('/posts', post)
      .then(response => {
        console.log(response);
        this.props.history.push('/posts');
        // this.setState({
        //   submitted: true
        // });
      })
      .catch(error => {
        console.log(error);
      });     
  }

  render () {
    return (
      <div className="NewPost">
        {this.state.submitted ? <Redirect to="/posts" /> : null}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
        <label>Content</label>
        <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
        <label>Author</label>
        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;

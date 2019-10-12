import React, { Component } from 'react';
import axios from '../../axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData = () => {
    const { id } = this.props.match.params;
    const { loadedPost } = this.state;
    if (id && (!loadedPost || (loadedPost && (+id !== loadedPost.id)))) {
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          this.setState({
            loadedPost: data
          });
        })
        .catch(error => {
          console.log(error);
        }); 
    }    
  }

  deletePostHandler = () => {
    const { id } = this.props.match.params;
    axios.delete(`/posts/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });     
  }


  render() {
    const { loadedPost } = this.state;
    const { id } = this.props.match.params;
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;

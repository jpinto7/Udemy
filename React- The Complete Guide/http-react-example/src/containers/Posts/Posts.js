import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Post from '../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import axios from '../../axios';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null
  }

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        console.log(response);
        const posts = response.data.slice(0, 4).map(post => ({
          ...post,
          author: 'Juan'
        }));
        this.setState({
          posts
        });
      })
      .catch(error => {
        console.log(error);
        // this.setState({
        //   error: true
        // });
      });
  }

  postSelectedHandler = postId => () => {
    this.setState({
      selectedPostId: postId
    });
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Link
          key={post.id}
          to={`/${post.id}`}
        >
          <Post
            {...post}
            clicked={this.postSelectedHandler(post.id)}
          />
        </Link>
      ));
    }
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path="/:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;

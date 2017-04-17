import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageList from './components/ImageList';

class App extends Component {
  state = {
    images: [],
  }

  componentWillMount() {
    axios.get('http://api.imgur.com/3/gallery/hot/viral/0')
      .then((response) => {
        const { data: images } = response.data;
        this.setState({
          images,
        });
      });
  }

  render() {
    const { images } = this.state;
    return (
      <div className="container">
        React App #2
        <ImageList
          images={images}
        />
      </div>
    );
  }
}

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#app'));
});

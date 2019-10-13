import React, { Component } from "react";
import PropTypes from "prop-types";

class HelloWorld extends Component {
  render () {
    return (
      <React.Fragment>
        <h1>Hello there!</h1>
        Greeting: {this.props.greeting}
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};

export default HelloWorld

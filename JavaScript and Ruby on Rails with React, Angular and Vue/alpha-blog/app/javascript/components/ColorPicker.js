import React, { Component} from 'react';
import PropTypes from "prop-types";
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  handleChange = color => {
    const pickedColor = color.hex;
    document.body.style.background = pickedColor;
    let elem = document.querySelector(`#${this.props.selector}`);
    elem.value = pickedColor;
  }

  render() {
    return (
      <SketchPicker
        color={this.props.color}
        onChange={this.handleChange}
      />
    );
  }
}


export default ColorPicker;

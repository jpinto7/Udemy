import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import ControlsContext from '../../context/controls-context';
import Backdrop from '../Backdrop';

class Modal extends Component {
  static contextType = ControlsContext;

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClicked || this.context.purchaseHandler(false)} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
};

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;

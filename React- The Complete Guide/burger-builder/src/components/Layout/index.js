import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar';
import SideDrawer from '../SideDrawer';
import styles from './styles.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  /*
    sideDrawerCloseHandler = () => {
      this.setState({
        showSideDrawer: false,
      });
    }
  */

  sideDrawerToggleHandler = () => {
    this.setState(state => ({
      showSideDrawer: !state.showSideDrawer,
    }));
  }

  render() {
    const { showSideDrawer } = this.state;
    const { children } = this.props;
    return (
      <>
        <Toolbar drawerToggleClick={this.sideDrawerToggleHandler} />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerToggleHandler} />
        <main className={styles.Content}>{children}</main>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;

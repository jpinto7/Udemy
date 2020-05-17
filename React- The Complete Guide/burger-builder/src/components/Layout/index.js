import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar';
import SideDrawer from '../SideDrawer';
import styles from './styles.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

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
  };

  render() {
    const { showSideDrawer } = this.state;
    const { children, isAuthenticated } = this.props;
    return (
      <>
        <Toolbar
          isAuth={isAuthenticated}
          drawerToggleClick={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={isAuthenticated}
          open={showSideDrawer}
          closed={this.sideDrawerToggleHandler}
        />
        <main className={styles.Content}>{children}</main>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: token !== null,
});

export default connect(mapStateToProps)(Layout);

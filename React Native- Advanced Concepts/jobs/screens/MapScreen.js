import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import * as reduxActions from '../actions';

const actions = {
  fetchJobs: reduxActions.fetchJobs
};

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon({ tintColor }) {
      return (
        <Icon
          color={tintColor}
          name="my-location"
          size={30}
        />
      );
    }
  }

  state = {
    componentLoaded: false,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }

  componentDidMount() {
    this.setState({ componentLoaded: true });
  }

  handleOnRegionChangeComplete = region => {
    this.setState({ region });
  }

  handleJobsSearch = () => {
    this.props.actions.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    if (!this.state.componentLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={this.state.region}
          onRegionChangeComplete={this.handleOnRegionChangeComplete}
          style={{ flex: 1 }}
        />
        <View style={styles.buttonContainer}>
          <Button
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            large
            onPress={this.handleJobsSearch}
            title="Search this area"
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(MapScreen);

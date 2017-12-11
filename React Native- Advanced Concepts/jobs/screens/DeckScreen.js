import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { View, Text, Platform } from 'react-native';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as reduxActions from '../actions';
import * as selectors from '../selectors';

const actions = {
  likeJob: reduxActions.likeJob
};

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon({ tintColor }) {
      return (
        <Icon
          color={tintColor}
          name="description"
          size={30}
        />
      );
    }
  }

  renderCard(job) {
    const initialRegion = {
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitude: job.longitude,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
            scrollEnabled={false}
            style={{ flex: 1 }}
          >
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>
      </Card>
    )
  }

  renderNoMoreCards = () => (
    <Card title="No More Jobs">
      <Button
        title="Back To Map"
        large
        icon={{ name: 'my-location' }}
        backgroundColor="#03A9F4"
        onPress={() => this.props.navigation.navigate('map')}
      />
    </Card>
  )

  handleOnSwipeRight = (job) => {
    this.props.actions.likeJob(job);
  }

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          keyProp="jobkey"
          onSwipeRight={this.handleOnSwipeRight}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  jobs: selectors.getJobs
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckScreen);

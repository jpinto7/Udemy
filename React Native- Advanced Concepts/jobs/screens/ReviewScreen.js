import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, View, Text, Platform, Linking } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import * as selectors from '../selectors';

const styles = {
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailText: {
    fontStyle: 'italic'
  }
};

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      navigate
    } = navigation;
    return {
      headerRight: (
        <Button
          backgroundColor="rgba(0, 0, 0, 0)"
          color="rgba(0, 122, 255, 1)"
          onPress={() => { navigate('settings'); }}
          title="Settings"
        />
      ),
      headerStyle: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      },
      title: 'Review Jobs',
      tabBarIcon({ tintColor }) {
        return (
          <Icon
            color={tintColor}
            name="favorite"
            size={30}
          />
        );
      }
    };
  }

  renderLikedJob = ({ company, url, jobkey, latitude, longitude, formattedRelativeTime, jobtitle }) => {
    const initialRegion = {
      latitude,
      latitudeDelta: 0.045,
      longitude,
      longitudeDelta: 0.02
    };

    return (
      <Card
        key={jobkey}
        title={jobtitle}
      >
        <View style={{ height: 200 }}>
          <MapView
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
            scrollEnabled={false}
            style={{ flex: 1 }}
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.detailText}>{company}</Text>
            <Text style={styles.detailText}>{formattedRelativeTime}</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            onPress={() => { Linking.openURL(url) }}
            title="Apply Now"
          />
        </View>
      </Card>
    );
  }

  render() {
    return (
      <ScrollView>
        {this.props.likedJobs.map(this.renderLikedJob)}
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  likedJobs: selectors.getLikedJobs
});

export default connect(mapStateToProps)(ReviewScreen);

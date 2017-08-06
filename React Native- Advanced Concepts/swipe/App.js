import { Font } from 'expo';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  Card
} from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class App extends Component {
  state = {
    fontLoaded: false
  }

  async componentWillMount() {
    await Font.loadAsync({
      'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
      'lato-light': require('./assets/fonts/Lato-Light.ttf'),
      'lato-regular': require('./assets/fonts/Lato-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  renderCard = ({ text, uri }) => {
    if (this.state.fontLoaded) {
      return (
        <Card
          fontFamily="lato-bold"
          title={text}
          image={{ uri: uri }}
        >
          <Button
            backgroundColor='#03A9F4'
            fontFamily="lato-regular"
            title='View Now'
          />
        </Card>
      );
    }
  }

  renderNoMoreCards(index) {
    return (
      <Card
        key={index}
        fontFamily="lato-bold"
        title="All done!"
      >
        <Text style={{ marginBottom: 10 }}>No more cards to swipe</Text>
        <Button
          backgroundColor='#03A9F4'
          fontFamily="lato-regular"
          title='View more'
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;

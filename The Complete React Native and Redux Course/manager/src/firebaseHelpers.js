import firebase from 'firebase';

export const configureFirebase = () => {
  const config = {
    apiKey: 'AIzaSyDklrjpt9TcaCtalL6kbV4w5NXEkRVDGZQ',
    authDomain: 'manager-13a42.firebaseapp.com',
    databaseURL: 'https://manager-13a42.firebaseio.com',
    storageBucket: 'manager-13a42.appspot.com',
    messagingSenderId: '1064321759460'
  };
  firebase.initializeApp(config);
};

export const checkIfUserSignedIn = (loggedIn, notLoggedIn) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loggedIn();
    } else {
      notLoggedIn();
    }
  });
};

export const logoutUser = () => {
  firebase.auth().signOut();
};

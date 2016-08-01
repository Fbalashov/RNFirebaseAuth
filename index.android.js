/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  ToolbarAndroid,
  ActivityIndicator
} from 'react-native';
import Login from './src/pages/Login';
import Account from './src/pages/Account';
import styles from './src/styles/baseStyles.js';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCq3lqjErh8OnsytkGndK6nmeXiVqYMcKo",
  authDomain: "react-native-auth-9fd6d.firebaseapp.com",
  databaseURL: "https://react-native-auth-9fd6d.firebaseio.com",
  storageBucket: "react-native-auth-9fd6d.appspot.com",
};
// Initialize the firebase app here and pass it to other components as needed. Only initialize on startup.
const firebaseApp = firebase.initializeApp(firebaseConfig);

class FirebaseAuth extends Component {
  constructor(props){
    super(props);
    this.state = {
      // the page is the screen we want to show the user, we will determine that
      // based on what user the firebase api returns to us.
      page: null
    };
  }

  componentWillMount(){
    // We must asynchronously get the auth state, if we use currentUser here, it'll be null
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      // If the user is logged in take them to the accounts screen
      if (user != null) {
        this.setState({page: Account});
        return;
      }
      // otherwise have them login
      this.setState({page: Login});
      // unsubscribe this observer
      unsubscribe();
    });
  }

  render() {
    if (this.state.page) {
      return (
        // Take the user to whatever page we set the state to.
        // We will use a transition where the new page will slide in from the right.
        <Navigator
          initialRoute={{component: this.state.page}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              // Pass the navigator the the page so it can navigate as well.
              // Pass firebaseApp so it can make calls to firebase.
              return React.createElement(route.component, { navigator, firebaseApp});
            }
        }} />
      );
    } else {
      return (
        // Our default loading view while waiting to hear back from firebase
        <View style={styles.container}>
          <ToolbarAndroid title="RN Firebase Auth" />
          <View style={styles.body}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('FirebaseAuth', () => FirebaseAuth);

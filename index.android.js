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
  View
} from 'react-native';
import Signup from './src/pages/signup';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCq3lqjErh8OnsytkGndK6nmeXiVqYMcKo",
  authDomain: "react-native-auth-9fd6d.firebaseapp.com",
  databaseURL: "https://react-native-auth-9fd6d.firebaseio.com",
  storageBucket: "react-native-auth-9fd6d.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class FirebaseAuth extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{component: Signup}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if(route.component){
            return React.createElement(route.component, { navigator, firebaseApp});
          }
      }} />
    );
  }
}

AppRegistry.registerComponent('FirebaseAuth', () => FirebaseAuth);

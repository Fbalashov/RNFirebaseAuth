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
import Signup from './src/pages/Signup';
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
  render() {
    return (
      // For now our navigator will always take us to the signup page.
      // We will use a transition where the new page will slide in from the right.
      <Navigator
        initialRoute={{component: Signup}}
        configureScene={() => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          if(route.component){
            // Pass the navigator the the component so it can navigate as well.
            // Pass firebaseApp so it can make calls to firebase.
            return React.createElement(route.component, { navigator, firebaseApp});
          }
      }} />
    );
  }
}

AppRegistry.registerComponent('FirebaseAuth', () => FirebaseAuth);

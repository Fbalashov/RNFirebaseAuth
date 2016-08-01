'use strict';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ToolbarAndroid
} from 'react-native';
import React, {Component} from 'react';
import Login from './Login';
import styles from '../styles/baseStyles.js';

// Styles specific to the account page
const accountStyles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});

export default class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillMount() {
    // get the current user from firebase
    const userData = this.props.firebaseApp.auth().currentUser;
    this.setState({
      user: userData,
      loading: false
    });
  }

  render() {
    // If we are loading then we display the indicator, if the account is null and we are not loading
    // Then we display nothing. If the account is not null then we display the account info.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
       this.state.user &&
        <View style={styles.body}>
          <View style={accountStyles.email_container}>
            <Text style={accountStyles.email_text}>{this.state.user.email}</Text>
          </View>
          <Image
            style={styles.image}
            source={{uri: this.state.user.photoURL}} />
          <TouchableHighlight onPress={this.logout.bind(this)} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Logout</Text>
          </TouchableHighlight>
        </View>
      ;
    return (
      <View style={styles.container}>
  			<ToolbarAndroid
          style={styles.toolbar}
          title="Account" />
        <View style={styles.body}>
          {content}
        </View>
      </View>
    );
  }

  logout() {
    // logout, once that is complete, return the user to the login screen.
    this.props.firebaseApp.auth().signOut().then(() => {
      this.props.navigator.push({
        component: Login
      });
    });
  }
}

AppRegistry.registerComponent('Account', () => Account);

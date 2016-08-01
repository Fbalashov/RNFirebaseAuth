'use strict';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ToolbarAndroid,
  ActivityIndicator
} from 'react-native';
import React, {Component} from 'react';
import Signup from './Signup';
import Account from './Account';
import styles from '../styles/baseStyles.js';

export default class Login extends Component {

  constructor(props){
    super(props);
    // We have the same props as in our signup.js file and they serve the same purposes.
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }

  render() {
    // The content of the screen should be inputs for a username, password and submit button.
    // If we are loading then we display an ActivityIndicator.
    const content = this.state.loading ? <ActivityIndicator size="large"/> :
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          placeholder={"Email Address"} />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          secureTextEntry={true}
          placeholder={"Password"} />
        <TouchableHighlight onPress={this.login.bind(this)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.goToSignup.bind(this)} style={styles.transparentButton}>
          <Text style={styles.transparentButtonText}>New here?</Text>
        </TouchableHighlight>
      </View>;

    // A simple UI with a toolbar, and content below it.
  	return (
  		<View style={styles.container}>
  			<ToolbarAndroid
          style={styles.toolbar}
          title="Login" />
        <View style={styles.body}>
          {content}
        </View>
      </View>
		);
  }

  login(){
    this.setState({
      loading: true
    });
    // Log in and display an alert to tell the user what happened.
    this.props.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    ).then((userData) =>
      {
        this.setState({
	        loading: false
	      });
        this.props.navigator.push({
          component: Account
        });
      }
    ).catch((error) =>
    	{
	      this.setState({
	        loading: false
	      });
        alert('Login Failed. Please try again' + error.message);
    });
  }

  // Go to the signup page
  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
}

AppRegistry.registerComponent('Login', () => Login);

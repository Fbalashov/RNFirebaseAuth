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
import styles from '../styles/baseStyles.js';
import React, {Component} from 'react';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //
      loaded: true,
      email: '',
      password: ''
    }
  }

  signup() {
    this.setState({
      loaded: false
    });

    this.props.firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(() => {
        alert('Your account was created!');
        this.setState({
          email: '',
          password: '',
          loaded: true
        });
        this.props.navigator.push({
          component: Account
        });
    }).catch((error) => {
      // handle the error
      this.setState({
        loaded: true
      });
      alert("Account creation failed: " + error.message );
    });
  }

  render() {
    const content = this.state.loaded ?
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
        <TouchableHighlight onPress={this.signup.bind(this)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Signup</Text>
        </TouchableHighlight>
      </View>
      : <ActivityIndicator />;

  	return (
  		<View style={styles.container}>
  			<ToolbarAndroid
          style={styles.toolbar}
          title="Signup" />
        <View style={styles.body}>
          {content}
        </View>
      </View>
		)
  }
}

AppRegistry.registerComponent('Signup', () => Signup);

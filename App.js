import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

import styles from "./styles";

import SetUpScreen from "./components/screens/setup";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SetUpScreen/>
      </View>
    );
  }
}


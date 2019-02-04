import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Router, Route, Switch} from "react-router";

import styles from "./styles";
import history from "./history";

import SetUpScreen from "./components/screens/setup";
import PickerScreen from "./components/screens/picker";


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={SetUpScreen}/>
            <Route path="/picker" component={PickerScreen}/>
          </Switch>
        </Router>
      </View>
    );
  }
}


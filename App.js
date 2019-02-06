import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Router, Route, Switch} from "react-router";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import styles from "./styles";
import history from "./history";
import reducers from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk)
);

const createStoreWithMiddleware = createStore(reducers, enhancer);

import SetUpScreen from "./components/screens/setup";
import PickerScreen from "./components/screens/picker";


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={createStoreWithMiddleware}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={SetUpScreen}/>
              <Route path="/picker" component={PickerScreen}/>
            </Switch>
          </Router>
        </Provider>
      </View>
    );
  }
}


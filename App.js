import React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Router, Route, Switch} from "react-router";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Permissions from 'expo-permissions';



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


async function enableCameraRoll() {
  const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Camera roll permissions are required in order to upload a background image.');
  }
}


export default class App extends React.Component {

  componentDidMount(){
    //ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    enableCameraRoll();
  }

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


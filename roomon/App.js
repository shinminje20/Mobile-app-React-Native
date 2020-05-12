import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MainNavigation from './src/pages/Navigation/MainNavigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import store from "./src/store";

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App;
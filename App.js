import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './src/common';
import Main from './src/pages/main';

export default class App extends React.Component {

  render() {
    //Disable yellow box warnings
    console.disableYellowBox = true;

    return (
      <View style={{ flex: 1 }}>
          <Header headerText="Interval Timer" />
          <Main />
      </View>
    );
  }
}
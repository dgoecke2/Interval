import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './common';
import Main from './pages/main';

class App extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header headerText="Welcome" />
                <Main />
            </View>
        );
    }
}

export default App;
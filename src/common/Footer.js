import React from 'react';
import { Text, View } from 'react-native';

const Footer = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}><Text>footer</Text></View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#277ddb',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        bottom: 15,
        shadowColor: '#000',
        shadowOffset: {height: 0, width: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'absolute'
    },
    textStyle: {
        fontSize: 20,
        color: '#fff'
    }
};


export { Footer };
import React from 'react';
import { Text, View, Modal, TouchableHighlight } from 'react-native';
import { Button } from './../common';

const ConfirmPopup = ({question, yesAction, noAction, visible}) => {
    return (
      <View>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.popupContainer}>
              <Text style={styles.question}>{question}</Text>
              <View style={styles.container}>
                <View style={styles.flexContainer}>
                  <Button onPress={yesAction}>
                    Yes
                  </Button>
                </View>
                <View style={styles.flexContainer}>
                  <Button onPress={noAction}>
                    No
                  </Button>
                </View>
            </View>
          </View>
        </Modal>
      </View>
    );
};

const styles = {
  popupContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  flexContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  question: {
    fontSize: 16,
    padding: 24
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,.8)',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};


export { ConfirmPopup };
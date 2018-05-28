import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
      fontSize: 20,
      color: '#FFFFFF'
  },
  headerContainer: {
      backgroundColor: "#0071ce",
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      paddingTop: 15,
      shadowOffset: { width: 0, height: 2},
      shadowColor: "#000000",
      elevation: 2,
      shadowOpacity: 0.2,
      position: 'relative'
  }
});

export default styles;
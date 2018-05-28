import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  gradient: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  errTextStyle: {
      fontSize: 20,
      color: 'red',
      alignSelf: 'center'
  },
  progressBar: {
    flex: 1,
    transform: [{ scaleX: 1.0 }, { scaleY: 10}], 
    height: 12,
    marginTop: 10,
    marginBottom: 30
  },
  container: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexContainer: {
    flex: 1,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  roundInfo: {
    alignSelf: 'center',
    height: 40,
    fontSize: 32,
    marginTop:20,
    marginBottom:10
  },
  clockContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100
  },
  clock: {
    fontSize: 40,
    bottom: 5
  },
  clockTitle: {
    fontSize: 20,
    top: 12
  },
  stickyFooter: {
    position: 'absolute', 
    left: 12, 
    right: 12, 
    bottom: 24
  },
  readyText: {
    fontSize: 24,
    color: '#007aff',
    alignSelf: 'center',
    bottom: 24
  },
  restText: {
    color: '#F66'
  }
});

export default styles;
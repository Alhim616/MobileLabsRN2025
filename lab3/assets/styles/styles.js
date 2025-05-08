import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scoreText: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  lastGestureText: {fontSize: 16, marginBottom: 20, color: '#666'},
  gestureButtonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 30,
    },
    gestureButton: {
      backgroundColor: '#3498db',
      padding: 10,
      margin: 4,
      borderRadius: 5,
      minWidth: 70,
      alignItems: 'center',
    },
    activeGestureButton: {backgroundColor: '#2ecc71'},
    gestureButtonText: {color: 'white', fontWeight: 'bold'},
    tasksButton: {
      marginTop: 30,
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: '#e74c3c',
      borderRadius: 8,
    },
  tasksButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default styles;

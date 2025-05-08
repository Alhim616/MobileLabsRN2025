import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const ClickableObject = ({children}) => {
  return (
    <Animated.View style={styles.clickableObject}>
      {children || <Text style={styles.clickText}>Interact with me!</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  clickableObject: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ClickableObject;

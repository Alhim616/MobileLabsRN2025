import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../assets/styles/styles';

const TaskItem = ({title, completed}) => {
  return (
    <View style={styles.taskItem}>
      <View
        style={[
          styles.taskStatus,
          {backgroundColor: completed ? '#2ecc71' : '#bdc3c7'},
        ]}
      />
      <Text style={styles.taskTitle}>{title}</Text>
    </View>
  );
};

export default TaskItem;

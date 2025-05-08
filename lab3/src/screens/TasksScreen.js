import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import TaskItem from '../components/TaskItem';
import styles from '../../assets/styles/styles';
import initialTasks from '../../assets/data/taskData';

const TasksScreen = ({route}) => {
  const {score = 0, clicks = 0, doubleTaps = 0, longPress = 0, panned = false, flingRight = false, flingLeft = false, pinched = false} = route.params || {};

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasks(tasks =>
      tasks.map(task => {
        let completed = false;
        switch (task.condition) {
          case 'clicks':
            completed = clicks >= task.target;
            break;
          case 'doubleTaps':
            completed = doubleTaps >= task.target;
            break;
          case 'longPress':
            completed = longPress >= task.target;
            break;
          case 'panned':
            completed = !!panned;
            break;
          case 'flingRight':
            completed = !!flingRight;
            break;
          case 'flingLeft':
            completed = !!flingLeft;
            break;
          case 'pinched':
            completed = !!pinched;
            break;
          case 'score':
            completed = score >= task.target;
            break;
        }
        return {...task, completed};
      })
    );
  }, [score, clicks, doubleTaps, longPress, panned, flingRight, flingLeft, pinched]);

  const renderItem = ({item}) => (
    <TaskItem title={item.title} completed={item.completed} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Current Score: {score}</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TasksScreen;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import TaskInputForm from './components/TaskInputForm';
import TaskItem from './components/TaskItem';
import { styles } from './assets/styles/style';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
  }

  async function scheduleReminder(task, description, time) {
    const trigger = new Date(time);
    const now = new Date();
    if (trigger <= now) {
      alert('Please select a future time for the reminder');
      return;
    }
    const seconds = Math.floor((trigger - now) / 1000);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `Don't forget: ${task}\n${description}`,
      },
      trigger: { seconds },
    });
  }

  const addTask = async (taskText, taskDescription, reminderTime) => {
    if (taskText.trim() === '') {
      alert('Please enter a task');
      return;
    }
    if (reminderTime.trim() === '') {
      alert('Please enter a reminder time');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      description: taskDescription,
      reminderTime: reminderTime,
    };
    setTasks([...tasks, newTask]);
    await scheduleReminder(taskText, taskDescription, reminderTime);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do Reminder</Text>
      <TaskInputForm onAddTask={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem item={item} onDelete={deleteTask} />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [reminderTime, setReminderTime] = useState('');

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

  async function scheduleReminder(task, time) {
    const trigger = new Date(time);
    const now = new Date();
    
    if (trigger <= now) {
      alert('Please select a future time for the reminder');
      return;
    }

    const seconds = Math.floor((trigger - now) / 1000);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Reminder",
        body: `Don't forget: ${task}`,
      },
      trigger: { seconds },
    });
  }

  const addTask = () => {
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
      reminderTime: reminderTime,
    };

    setTasks([...tasks, newTask]);
    scheduleReminder(taskText, reminderTime);
    setTaskText('');
    setReminderTime('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do Reminder</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={taskText}
          onChangeText={setTaskText}
        />
        <TextInput
          style={styles.input}
          placeholder="Reminder time (YYYY-MM-DD HH:mm)"
          value={reminderTime}
          onChangeText={setReminderTime}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskText}>{item.text}</Text>
              <Text style={styles.reminderTime}>Reminder: {item.reminderTime}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reminderTime: {
    fontSize: 12,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});

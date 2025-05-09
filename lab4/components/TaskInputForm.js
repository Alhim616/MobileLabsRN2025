import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { styles } from '../assets/styles/style';

export default function TaskInputForm({ onAddTask }) {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = () => {
    onAddTask(text, description, time);
    setText('');
    setDescription('');
    setTime('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Reminder time (YYYY-MM-DD HH:mm)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
}


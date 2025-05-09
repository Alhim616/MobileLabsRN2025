import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ item, onDelete }) {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskText}>{item.text}</Text>
        {item.description ? (
          <Text style={styles.taskDescription}>{item.description}</Text>
        ) : null}
        <Text style={styles.reminderTime}>Reminder: {item.reminderTime}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskInfo: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
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

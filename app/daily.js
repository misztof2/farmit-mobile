import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import TaskItem from '../components/TaskItem';
import axios from 'axios';

/**
 * DailyScreen shows tasks scheduled for the current day. It fetches
 * assignments from the back‑end and renders them in a list. Users can
 * toggle the completion status of a task which triggers an update to
 * the server. For the purposes of this skeleton implementation the
 * tasks are static.
 */
export default function DailyScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // In a real implementation tasks would be fetched from the API. For now
    // populate the list with a few dummy items using the user role for
    // demonstration.
    const demoTasks = [
      { id: '1', title: 'Sprawdź nawadnianie', description: 'Upewnij się, że system nawadniania działa poprawnie.', status: 'Pending' },
      { id: '2', title: 'Zbiór pomidorów', description: 'Zbierz dojrzałe pomidory z pola A.', status: 'Completed' },
      { id: '3', title: 'Kontrola szklarni', description: 'Sprawdź temperaturę i wilgotność w szklarni.', status: 'Pending' },
    ];
    setTasks(demoTasks);
  }, [user]);

  const handleToggle = async (task) => {
    const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    // Update local state optimistically
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: updatedStatus } : t))
    );
    // In a real app you would perform a network request here, for example:
    // await axios.put(`${API_BASE_URL}/task/${task.id}/status`, { status: updatedStatus });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Zadania dzienne</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
        ListEmptyComponent={<Text style={{ color: theme.colors.muted }}>Brak zadań na dziś</Text>}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 32,
  },
});

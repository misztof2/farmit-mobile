import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import TaskItem from '../components/TaskItem';

export default function WeeklyScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Placeholder weekly tasks
    const demoTasks = [
      { id: 'w1', title: 'Przegląd maszyn', description: 'Upewnij się, że wszystkie maszyny są w dobrym stanie.', status: 'Pending' },
      { id: 'w2', title: 'Przycinanie roślin', description: 'Przytnij rośliny w szklarni.', status: 'Pending' },
    ];
    setTasks(demoTasks);
  }, [user]);

  const handleToggle = (task) => {
    const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: updatedStatus } : t))
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Zadania tygodniowe</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
        ListEmptyComponent={<Text style={{ color: theme.colors.muted }}>Brak zadań na ten tydzień</Text>}
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

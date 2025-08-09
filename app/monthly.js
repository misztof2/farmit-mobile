import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import TaskItem from '../components/TaskItem';

export default function MonthlyScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const demoTasks = [
      { id: 'm1', title: 'Sprawdzenie stanu plon\u00f3w', description: 'Sprawd\u017a roczny stan plon\u00f3w w magazynie', status: 'Pending' },
      { id: 'm2', title: 'Inwentaryzacja', description: 'Przeprowadz\u017a inwentaryzacj\u0119 narz\u0119dzi i maszyn', status: 'Pending' },
    ];
    setTasks(demoTasks);
  }, [user]);

  const handleToggle = (task) => {
    const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: updatedStatus } : t)));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.heading, { color: theme.colors.text }]}>Zadania miesi\u0119czne</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
        ListEmptyComponent={<Text style={{ color: theme.colors.muted }}>Brak zada\u0144 na ten miesi\u0105c</Text>}
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

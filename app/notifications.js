import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

/**
 * NotificationsScreen lists notifications received from the back‑end. Each
 * item can be marked as read by tapping on it. In a real app you would
 * fetch notifications from `/api/notification/user` and update them via
 * `/read` or delete them via `/delete`. Here we demonstrate the UI only.
 */
export default function NotificationsScreen() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const demo = [
      { id: 'n1', type: 'Warning', message: 'Pamiętaj o nawadnianiu pola B', read: false },
      { id: 'n2', type: 'Reminder', message: 'Planowany przegląd maszyn jutro o 10:00', read: true },
      { id: 'n3', type: 'System', message: 'Nowa wersja aplikacji jest dostępna', read: false },
    ];
    setNotifications(demo);
  }, []);

  const toggleRead = (item) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: !n.read } : n))
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: item.read ? theme.colors.card : theme.colors.card, borderColor: theme.colors.border }]}
      onPress={() => toggleRead(item)}
    >
      <Text style={[styles.type, { color: theme.colors.accent }]}>{item.type}</Text>
      <Text style={[styles.message, { color: theme.colors.text }]}>{item.message}</Text>
      {!item.read && <View style={[styles.badge, { backgroundColor: theme.colors.accent }]} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>      
      <Text style={[styles.heading, { color: theme.colors.text }]}>Powiadomienia</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ color: theme.colors.muted }}>Brak powiadomień</Text>}
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
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    position: 'relative',
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 16,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

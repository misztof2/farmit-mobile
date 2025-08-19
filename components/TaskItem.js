import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function TaskItem({ task, onToggle }) {
  const { theme } = (typeof useTheme === 'function' ? useTheme() : { theme: { colors: { card: '#131a24', text: '#e6eef9', muted: '#7b8794', accent: '#2ecc71' } }});
  const done = task?.status === 'Completed';
  return (
    <TouchableOpacity style={[styles.item, { backgroundColor: theme.colors.card }]} onPress={() => onToggle?.(task)}>
      <Ionicons
        name={done ? 'checkbox' : 'square-outline'}
        size={22}
        color={done ? theme.colors.accent : theme.colors.muted}
      />
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
          {task?.title ?? 'Task'}
        </Text>
        {task?.description ? (
          <Text style={[styles.desc, { color: theme.colors.muted }]} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  body: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 12, marginTop: 2 },
});

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Tile displays a simple icon with a label. It acts like a button and
 * dispatches `onPress` when touched. The style is responsive: it takes
 * roughly half of the available width in a grid layout and uses the
 * colours defined in the current theme.
 */
export default function Tile({ title, icon, onPress }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
        pressed && { opacity: 0.75 },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={32} color={theme.colors.accent} />
      </View>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

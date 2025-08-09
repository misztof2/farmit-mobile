import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'expo-router';

/**
 * ResourcesScreen lists types of farm resources. Selecting a category
 * navigates to a placeholder screen for that resource. Managers and admins
 * will eventually be able to add, edit or delete resources; workers can
 * only view them. This skeleton simply navigates to empty routes.
 */
export default function ResourcesScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const categories = [
    { id: 'resource', label: 'Zasoby', route: '/resources/resource' },
    { id: 'tool', label: 'Narzędzia', route: '/resources/tool' },
    { id: 'building', label: 'Budynki', route: '/resources/building' },
    { id: 'field', label: 'Pola', route: '/resources/field' },
    { id: 'livestock', label: 'Zwieręta', route: '/resources/livestock' },
  ];
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>      
      <Text style={[styles.heading, { color: theme.colors.text }]}>Zasoby i wyposażenie</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
            onPress={() => router.push(item.route)}
          >
            <Text style={{ color: theme.colors.text, fontSize: 16 }}>{item.label}</Text>
          </TouchableOpacity>
        )}
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
  },
});

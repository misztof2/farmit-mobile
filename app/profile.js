import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

/**
 * ProfileScreen displays the authenticated user's details and allows them
 * to log out. It also demonstrates conditional navigation: if the user
 * lacks an associated farm (farmId undefined) then a message invites
 * them to create one (this could link to a create farm screen).
 */
export default function ProfileScreen() {
  const { user, logout, loading } = useAuth();
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Text style={[styles.heading, { color: theme.colors.text }]}>Profil</Text>
      {user ? (
        <>
          <Text style={[styles.info, { color: theme.colors.text }]}>Imię: {user.name || '—'}</Text>
          <Text style={[styles.info, { color: theme.colors.text }]}>E-mail: {user.email}</Text>
          <Text style={[styles.info, { color: theme.colors.text }]}>Rola: {user.role || '—'}</Text>
          <Text style={[styles.info, { color: theme.colors.text }]}>Farma ID: {user.farmId || 'brak'}</Text>
          {!user.farmId && (
            <Text style={{ color: theme.colors.accent, marginTop: 8 }}>
              Nie masz przypisanej farmy. Skontaktuj się z administratorem lub utwórz farmę.
            </Text>
          )}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.accent }]}
            onPress={logout}
            disabled={loading}
          >
            <Text style={{ color: theme.colors.background, fontWeight: '600' }}>Wyloguj</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ color: theme.colors.muted }}>Brak danych użytkownika</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

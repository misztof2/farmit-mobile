import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

/**
 * RegisterScreen collects a user's details and sends them to the server to
 * create a new account. Upon successful registration the user is logged in
 * automatically via AuthContext. Passwords are minimally validated on the
 * client for equality; additional validation should be performed on the
 * backend.
 */
export default function RegisterScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { register, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState(undefined);

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      setLocalError('Wypełnij wszystkie pola');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Hasła nie są takie same');
      return;
    }
    setLocalError(undefined);
    await register({ email: email.trim(), password, name });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }] }>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Zarejestruj się</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Imię i nazwisko"
        placeholderTextColor={theme.colors.muted}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="E-mail"
        placeholderTextColor={theme.colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Hasło"
        placeholderTextColor={theme.colors.muted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
        placeholder="Potwierdź hasło"
        placeholderTextColor={theme.colors.muted}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {(localError || error) && (
        <Text style={styles.error}>{localError || error}</Text>
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.accent }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.colors.background }]}>Zarejestruj</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={[styles.link, { color: theme.colors.accent }]}>Masz już konto? Zaloguj się</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    fontSize: 14,
    textAlign: 'center',
  },
  error: {
    color: '#EF4444',
    marginBottom: 8,
    textAlign: 'center',
  },
});

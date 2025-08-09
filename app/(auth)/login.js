import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "expo-router";
export default function Login() {
  const { theme } = useTheme(); const { login } = useAuth();
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const submit = async ()=>{ setErr(""); setLoading(true); try{ await login(email,password);}catch(e){ setErr("Błąd logowania"); } finally{ setLoading(false);} };
  return <View style={[styles.wrap,{backgroundColor:theme.colors.bg}]}>
    <Text style={[styles.title,{color:theme.colors.text}]}>FarmIt — Logowanie</Text>
    <TextInput style={[styles.input,{borderColor:theme.colors.border,color:theme.colors.text}]} placeholder="Email" placeholderTextColor={theme.colors.subtext} value={email} onChangeText={setEmail}/>
    <TextInput style={[styles.input,{borderColor:theme.colors.border,color:theme.colors.text}]} placeholder="Hasło" placeholderTextColor={theme.colors.subtext} secureTextEntry value={password} onChangeText={setPassword}/>
    {err ? <Text style={{color:theme.colors.danger}}>{err}</Text> : null}
    <TouchableOpacity onPress={submit} style={[styles.btn,{backgroundColor:theme.colors.accent}]} disabled={loading}>
      {loading ? <ActivityIndicator/> : <Text style={{fontWeight:"700"}}>Zaloguj</Text>}
    </TouchableOpacity>
    <Link href="/(auth)/register" style={{color:theme.colors.subtext, marginTop:12}}>Nie masz konta? Zarejestruj się</Link>
  </View>;
}
const styles = StyleSheet.create({ wrap:{flex:1,justifyContent:"center",padding:20,gap:12}, title:{fontSize:24,fontWeight:"700"}, input:{borderWidth:1,borderRadius:10,padding:12}, btn:{padding:14,borderRadius:12,alignItems:"center"}});

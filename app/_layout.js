import React from "react";
import { Slot, useSegments, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";

function Guard() {
  const { user, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  React.useEffect(() => {
    if (initializing) return;
    const inAuth = segments[0] === "(auth)";
    if (!user && !inAuth) router.replace("/(auth)/login");
    if (user && inAuth) router.replace("/(tabs)/dashboard");
  }, [segments, user, initializing]);
  return <Slot />;
}
export default function Root() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Guard />
      </AuthProvider>
    </ThemeProvider>
  );
}

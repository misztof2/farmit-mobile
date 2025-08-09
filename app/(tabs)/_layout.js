import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
export default function TabsLayout() {
  const { theme } = useTheme();
  return (
    <Tabs screenOptions={{
      headerStyle:{ backgroundColor: theme.colors.card },
      headerTintColor: theme.colors.text,
      tabBarStyle:{ backgroundColor: theme.colors.card, borderTopColor: theme.colors.border },
      tabBarActiveTintColor: theme.colors.accent,
      tabBarInactiveTintColor: theme.colors.subtext
    }}>
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Tabs>
  );
}

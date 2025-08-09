import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
export default function Dashboard(){
  const { theme } = useTheme();
  return <View style={{flex:1, backgroundColor:theme.colors.bg, alignItems:"center", justifyContent:"center"}}>
    <Text style={{color:theme.colors.text, fontSize:18}}>Dashboard (kafelki w kolejnym kroku)</Text>
  </View>;
}

import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons'; // Use Ionicons here

export default function OptionItem({ icon, value }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <Ionicons name={icon} size={18} color="#000000" /> 
      <Text style={{ fontFamily: "outfit", marginLeft: 5 }}>{value}</Text>
    </View>
  );
}
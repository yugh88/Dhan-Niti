import { View, Text } from 'react-native';
import React from 'react';

export default function SubHeading({ text }) {
  return (
    <View>
      <Text
        style={{
          fontFamily: 'outfit',
          fontSize: 24,
          color: 'white',
          marginTop: 27, 
        }}
      >
        {text}
      </Text>
    </View>
  );
}
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved Screen</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24, // Custom font size for better readability
    fontWeight: 'bold', // Make the text bold for emphasis
  },
});
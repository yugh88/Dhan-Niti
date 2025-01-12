import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';

const Page = () => {
  const [text, setText] = useState("Discover Screen");

  const changeText = () => {
    setText("New Content for Discover Screen");
  };

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Button title="Change Text" onPress={changeText} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Colors } from '/Users/yughjuneja/Downloads/Financial_App/constants/Colors.js'; // Ensure correct path

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);
    router.replace('/(tabs)'); // Adjust route path if needed
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        source={require('@/assets/images/getting-started.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(500)}>
            Stay Updated
          </Animated.Text>
          <Animated.Text style={styles.description} entering={FadeInRight.delay(700).duration(500)}>
            Newssssssssssssss
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity
              style={[styles.btn, isLoading && { opacity: 0.6 }]}
              onPress={handlePress}
              disabled={isLoading}
            >
              <Text style={styles.btnText}>{isLoading ? 'Loading...' : 'Get Started'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Ensures the background fills the screen
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: 'center',
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
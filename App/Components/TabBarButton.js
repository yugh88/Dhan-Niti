import { Pressable, StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';  // Using Ionicons for built-in icons

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, label }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Ensure shared values are updated properly on the UI thread
    opacity.value = withSpring(isFocused ? 1 : 0, { duration: 150 });
    scale.value = withSpring(isFocused ? 1.2 : 1, { duration: 150 });
  }, [isFocused]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isFocused ? 1 : 0),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable 
      onPress={onPress} 
      onLongPress={onLongPress} 
      style={styles.tabButton}>
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        <Ionicons 
          name={routeName} 
          size={24} 
          color={isFocused ? '#3498db' : '#95a5a6'} // Direct color values (active and inactive)
        />
      </Animated.View>
      <Animated.Text style={[styles.tabLabel, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 10,
  },
  iconContainer: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    color: '#95a5a6', // Default inactive color
    fontWeight: "600",
  },
});

export default TabBarButton;
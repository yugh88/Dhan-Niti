import { Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from 'react-native-vector-icons';  // Importing Ionicons from react-native-vector-icons
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const TabBarButton = ({ onPress, onLongPress, isFocused, routeName, label }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
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
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabButton}>
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        {/* Use Ionicons for icons based on routeName */}
        <Ionicons name={routeName} size={24} color="#fff" />
      </Animated.View>
      <Animated.Text style={[styles.tabLabel, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 25,
    backgroundColor: "#FF6347",  // Direct color applied (instead of using Colors.primary)
  },
  tabLabel: {
    fontSize: 12,
    color: "#4CAF50",  // Direct color applied (instead of using Colors.secondary)
    marginTop: 4,
  },
});
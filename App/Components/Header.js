import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=female' }}
          style={styles.userImg}
        />
        <View style={{ gap: 3 }}>
          <Text style={styles.welcomeTxt}>Welcome</Text>
          <Text style={styles.userName}>John</Text>
        </View>
      </View>

      {/* You can directly render the Ionicons without TouchableOpacity if not needed */}
      <TouchableOpacity onPress={() => {}}>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Ensure you're using React Native >= 0.71 for `gap` support
  },
  welcomeTxt: {
    fontSize: 12,
    color: '#7D7D7D', // Replace `Colors.darkGrey` with hex code
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: 'black', // Replace `Colors.black` with hex code
  },
});
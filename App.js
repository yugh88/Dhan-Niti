import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo';
import LoginScreen from '/Users/yughjuneja/Dhan-Niti/App/Screen/LoginScreen.js';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from '/Users/yughjuneja/Dhan-Niti/App/Navigations/TabNavigations.js';


export default function App() {
  const [fontsLoaded] = useFonts({
    'Outfit': require('./assets/fonts/Outfit-Regular.ttf'), 
    'RubikVinyl': require('./assets/fonts/RubikVinyl-Regular.ttf'),
    'SpaceMono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    'Delius': require('./assets/fonts/Delius-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ClerkProvider publishableKey={"pk_test_ZnVsbC1qYXktODUuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
    <View style={styles.container}>

         <SignedIn>
          <NavigationContainer>
            <TabNavigations/>
          </NavigationContainer>
         </SignedIn>
         <SignedOut>
      <LoginScreen />
      </SignedOut>
      
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:29,
  },
});
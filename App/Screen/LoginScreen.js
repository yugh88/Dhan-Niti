import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import google from '/Users/yughjuneja/Dhan-Niti/assets/images/Google.jpeg'; 
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';
import {useOAuth} from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const Colors = {
  PRIMARY: '#6857E8',       
  WHITE: '#fff',       
  Light_PRIMARY: '#C2BAFF',
  BLACK: '#000', 
};

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google"});

    const onPress = React.useCallback(async () => {
        try{
            const {createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
            if (createdSessionId) {
                setActive({session: createdSessionId});
            } else {
                //use sigin or sign up for next steps such as mfa 
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/yughjuneja/Dhan-Niti/assets/images/DMO.png')}  
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Dhan-Niti</Text>
        <Text style={styles.subtitle}>Empowering Financial Literacy</Text> 

        <TouchableOpacity 
          onPress={onPress}
            style={{backgroundColor:Colors.WHITE,
            display:'flex',flexDirection:'row',
            alignItems:'center', gap:10,
            justifyContent: 'center',
            padding:10,
            borderRadius:99,marginTop:45, width: 302, height:50, marginLeft:30, marginRight:25,
         }}>
          <Image source={google} style={{width:40, height:40}}/>
         <Text style ={{ fontSize : 20,
            color:Colors.BLACK,
            fontFamily:'outfit'
         }}> Sign In with Google</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: 250,
    height: 500,
    resizeMode: 'contain',
    marginTop: 50,
  },
  overlay: {
    height: 400,
    backgroundColor: Colors.PRIMARY,
    width: '100%',
    marginTop: -100,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    color: Colors.WHITE,
    fontFamily: 'Delius', 
    marginTop: 30,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
    color: Colors.Light_PRIMARY,
    fontFamily: 'Outfit', 
  },
  googleButton: {
    backgroundColor: Colors.PRIMARY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 99,
    marginTop: 25,
    width: 30,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
  googleText: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: 'Outfit',
  },
});
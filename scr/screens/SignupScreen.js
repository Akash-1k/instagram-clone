import { View, Text , StyleSheet, Image, Pressable} from 'react-native'
import React from 'react'
import SignupForm from '../components/SignupForm';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/instagramLogo.png")}
        />
        <Text style={styles.title}>Sign up to see photos and videos from your friends.</Text>
        <Pressable
          style={[styles.button,{flexDirection: 'row', width: '100%', justifyContent: 'center',}]}
        >
          <Image
            style={{width: 20, height: 20, marginRight: 10}}
            source={require("../assets/fbLogoWhite.png")}
          />
            <Text style={styles.buttonText}>Log in with Facebook</Text>
        </Pressable>

        <View style={{flexDirection: 'row', alignItems: 'center', padding: 20, }}>
            <View style={{flex: 1, height: 1, backgroundColor: '#bab6b6'}} />
            <View>
                <Text style={{width: 50, textAlign: 'center', color: '#bab6b6', fontWeight: 'bold'}}>OR</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#bab6b6'}} />
        </View>
      </View>  
      <SignupForm/>
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 50,
      paddingHorizontal: 12,  
      marginTop: 35,
      
  },
  title: {
    fontSize: 17,
    color: '#8e8e8e',

  },
  logoContainer: {
      alignItems: 'center',
      marginTop: 60,
  },
  button: {
    backgroundColor: '#0096F6',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42, 
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 19,
  },
});
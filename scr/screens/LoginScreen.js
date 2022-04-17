import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';



export default function LoginScreen() {
  return (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
                source={require("../assets/instagramLogo.png")}
            />
          </View>  
          <LoginForm/>
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
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
});
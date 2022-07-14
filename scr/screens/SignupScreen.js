import { View, Text , StyleSheet, Image, ScrollView, Pressable, SafeAreaView, Platform} from 'react-native'
import React from 'react'
import SignupForm from '../components/SignupForm';
import Styles from '../styles/Styles';

export default function SignupScreen({ navigation }) {
  return (  
  <SafeAreaView style={Styles.androidSafeArea}>
    <ScrollView showsVerticalScrollIndicator={false}>  
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            style={{ height: 50, width: 150, resizeMode: 'contain'}}
            source={require('../assets/instagramLogo.png')}
          />
        </View>  
        <Text style={styles.title}>Sign Up to see photos and videos from your friends.</Text>
        <Pressable
          style={styles.button}
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
        <SignupForm navigation={navigation}/>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const styles= StyleSheet.create({
  container: {
      // flex: 1,
      marginTop: '3%',
      marginHorizontal: '12%', 
      justifyContent: 'center',
      alignItems: 'center',   
  },
  logoContainer: {
    alignItems: 'center',
    // flex: 1,
    // height: 300,
    // width: 250,
    // marginTop: '10%',
    // backgroundColor: 'red',

  },
  title: {
    marginTop: '5%',
    fontSize: 18,
    color: '#8e8e8e',
    textAlign: 'center',
  },
  button: {
    marginTop: '5%',
    backgroundColor: '#0096F6',
    paddingVertical: '2%',
    paddingHorizontal: '20%',
    alignItems: 'center',
    minHeight: 42, 
    borderRadius: 4, 
    flexDirection: 'row', 
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    // fontSize: 19,
    fontSize: Platform.OS === "web" ? 16 : 19,
  },
});
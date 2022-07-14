import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import React, {useState, useContext} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../config/userContext'

const Header = ({navigation}) => {
  
  const {userValue, setUservalue} = useContext(UserContext)
  const [mode, setMode] = useState(false)

  const userDetails = {
    "email": "admin@gmail.com",
    "fullname": "Admin",
    "password": "Pass1234@",
    "username": "admin",
    "avtar": 'https://randomuser.me/api/portraits/men/32.jpg',
  }
  const logout = async () => {
    {
      try {
        // await AsyncStorage.removeItem('UserName'); // removes the specific (provided value) value in AsyncStorage
        await AsyncStorage.clear(); 
        setUservalue({isLogged: false, userDeatils: ''})
        console.log('userValue', userValue)
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
        {/* <Text>{userDetails.username}</Text> */}
        <TouchableOpacity onPress={logout}>
                <Image 
                style={[styles.logoContainer, { height: 50, resizeMode: 'contain',}]}
                source={mode ? require("../assets/instagramWordLogoWhite.png") : require("../assets/instagramWordLogo.png")}/>
        </TouchableOpacity>
        <Switch value={mode} onValueChange={(value)=> {
            setMode(value)
            EventRegister.emit('changeTheme', value)
            // console.log(mode)
        }} />
        <View style={styles.iconContainer}>
            <TouchableOpacity
                onPress={() => {navigation.push('NewPost', {
                    paramKey: userDetails,
                })}}
            >
                <Image 
                  style={styles.newPost}
                  source={mode ? require("../assets/newPostWhite.png") : require("../assets/newPost.png")}
                /> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
                <View style={styles.unreadMsg}>
                    <Text style={styles.unreadMsgText}>12</Text>
                </View>
                <Image 
                  style={{width: 33, height: 33, marginLeft: 10 }}
                  source={mode ? require("../assets/chatWhite.png") : require("../assets/chat.png")}
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        width: 100,
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
    },
    newPost: {
        width: 28,
        height: 28,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadMsg: {
        backgroundColor: '#ff3250',
        position: 'absolute',
        left: 25,
        bottom: 20,
        width: 20,
        height: 20,
        borderRadius: 100,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    unreadMsgText: {
        color: 'white',
        fontWeight: 'bold',
    },
}) 

export default Header

// *************************************************************************************

// import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
// import React, {useState} from 'react';
// import { EventRegister } from 'react-native-event-listeners';

// const Header = ({navigation, userDetails}) => {
//   console.log("Header", userDetails)
  
//   const [mode, setMode] = useState(false)
//   return (
//     <View style={styles.container}>
//         {/* <Text>{userDetails.username}</Text> */}
//         <TouchableOpacity>
//                 <Image 
//                 style={[styles.logoContainer, { height: 50, resizeMode: 'contain',}]}
//                 source={mode ? require("../assets/instagramWordLogoWhite.png") : require("../assets/instagramWordLogo.png")}/>
//         </TouchableOpacity>
//         <Switch value={mode} onValueChange={(value)=> {
//             setMode(value)
//             EventRegister.emit('changeTheme', value)
//             // console.log(mode)
//         }} />
//         <View style={styles.iconContainer}>
//             <TouchableOpacity
//                 onPress={() => {navigation.push('NewPost', {
//                     paramKey: userDetails,
//                 })}}
//             >
//                 <Image 
//                   style={styles.newPost}
//                   source={mode ? require("../assets/newPostWhite.png") : require("../assets/newPost.png")}
//                 /> 
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>navigation.navigate('Chat')}>
//                 <View style={styles.unreadMsg}>
//                     <Text style={styles.unreadMsgText}>12</Text>
//                 </View>
//                 <Image 
//                   style={{width: 33, height: 33, marginLeft: 10 }}
//                   source={mode ? require("../assets/chatWhite.png") : require("../assets/chat.png")}
//                 />
//             </TouchableOpacity>
//         </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         marginHorizontal: '5%',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     logoContainer: {
//         width: 100,
//         resizeMode: 'contain',
//     },
//     iconContainer: {
//         flexDirection: 'row',
//     },
//     newPost: {
//         width: 28,
//         height: 28,
//         marginLeft: 10,
//         resizeMode: 'contain',
//     },
//     unreadMsg: {
//         backgroundColor: '#ff3250',
//         position: 'absolute',
//         left: 25,
//         bottom: 20,
//         width: 20,
//         height: 20,
//         borderRadius: 100,
//         zIndex: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     unreadMsgText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// }) 

// export default Header
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, {useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginAsync = ({navigation}) => {

  const [user, setUser]= React.useState(null)

  useEffect(() => {
    getData()
   },[])
  
   const getData = () => {
    try{
      AsyncStorage.getItem('UserData')
        .then(value => {
          if(value != null){
            navigation.navigate('Screen1')
          }
        })
    }
    catch (error){
      console.log(error)
    }
  }

  const _loginBtnPress = async () =>{
    if (user.length <= 4){
      console.log('Enter full name')
    } 
    else {
      try {
        const userInfo = {
          User: user
        }
        await AsyncStorage.setItem('UserData', JSON.stringify(userInfo));
        navigation.navigate('Screen1')
      }catch (error){
        console.log(error)
      }
    }
  }

  return (
    <View style={style.container}>
      <Text style={{fontSize: 50}}>LoginAsync</Text>
      <TextInput
        placeholder='Enter name'
        placeholderTextColour='#444'
        autoFocus={false}
        onChangeText={setUser}
        value={user}
      />
      <Button title='Login' onPress={_loginBtnPress}/>

    </View>
  )
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 100
    }
})

export default LoginAsync
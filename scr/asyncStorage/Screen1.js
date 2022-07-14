import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen1 = ({ navigation }) => {


  const [user, setUser] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const logout = async () => {
    {
      try {
        // await AsyncStorage.removeItem('UserName'); // removes the specific (provided value) value in AsyncStorage
        await AsyncStorage.clear(); 
        navigation.navigate('LoginAsync');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then((value) => {
        if (value != null) {
          const userInfo = JSON.parse(value);

          setUser(userInfo.User);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log('Screen 1');
  return (
    <View style={{top: 100}}>
      <Text>
        Screen 1  {'\n'} {user}
      </Text>
      <Button title="Logout" onPress={logout} />
      <Button title="Screen 2" onPress={() => navigation.navigate('Screen2')} />
    </View>
  );
};

export default Screen1;

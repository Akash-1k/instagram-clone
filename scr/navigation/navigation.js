import { View, Text, ActivityIndicator, StatusBar } from 'react-native'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import React from 'react'

export const AuthLoadingScreen = () => {
    return(
        <View>
            <ActivityIndicator/>
            <StatusBar barStyle='default'/>
        </View>
    )
}

export const LoggedOut = () =>(
    <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Welcome to Instagram'}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{title: 'Sign In'}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
  
export const LoggedIn = () =>(
    <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName='NewsFeed' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="NewsFeed" component={NewsFeed} />
            <Stack.Screen name="NewPost" component={NewPostScreen} />
            <Stack.Screen name="AddNewPostScreen" component={AddNewPostScreen} />
            <Stack.Screen name="AddPostModal" component={AddPostModal} />
            <Stack.Screen name="Demo" component={Demo} />
            <Stack.Screen name="LoginForm" component={LoginForm} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    </NavigationContainer>
);


export default navigation
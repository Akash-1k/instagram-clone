
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './scr/screens/LoginScreen'
import SignupScreen from './scr/screens/SignupScreen'
import NewsFeed from './scr/screens/NewsFeed'
import NewPostScreen from './scr/screens/NewPostScreen'

const Stack = createNativeStackNavigator()

export const SignedInStack = () => (
    <NavigationContainer>           
        <Stack.Navigator initialRouteName='NewsFeed' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="NewsFeed" component={NewsFeed} />
            <Stack.Screen name="NewPost" component={NewPostScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => (
    <NavigationContainer>           
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Welcome to Instagram'}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{title: 'Sign In'}} />
        </Stack.Navigator>
    </NavigationContainer>
)

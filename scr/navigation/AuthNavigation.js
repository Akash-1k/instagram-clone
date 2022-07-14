import { View, Text } from 'react-native'
import React from 'react'
import { LoggedIn, LoggedOut } from './navigation'

const AuthNavigation = () => {
  return <>{currentUser ? <LoggedIn/> : <LoggedOut/>}</>
}

export default AuthNavigation
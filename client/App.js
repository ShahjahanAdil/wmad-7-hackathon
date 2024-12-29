import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'react-native'
import AuthContextProvider from './src/contexts/AuthContext';
import AppNavigator from './src/Navigation/AppNavigator'

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar barStyle={"dark-content"} backgroundColor={'#fff'} />
      <AppNavigator />
    </AuthContextProvider>
  )
}
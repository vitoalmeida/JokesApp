import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootStack from './src/navigation/RootStack.js'

export default function App() {
  <StatusBar style="auto" />
  return <RootStack/>;
}
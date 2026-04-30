import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import { AuthProvider } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AuthProvider>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ff8c00',
        },
        headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      contentStyle: {
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
      },
    }} 
    initialRouteName='Home'>
      
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}></Stack.Screen>
        <Stack.Screen
          name="Notes"
          component={NoteScreen}
          options={{title: 'Notes'}}></Stack.Screen>

      </Stack.Navigator>
    </AuthProvider>
  );
};

export default AppNavigator;
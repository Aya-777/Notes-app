import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/NoteScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthProvider, useAuth } from '../context/AuthContext';
import{ TouchableOpacity, Text, StyleSheet } from 'react-native';

const HeaderLogout = () => {
  const {user, signOut} = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
}

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
      headerRight: () => <HeaderLogout />,
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
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login'}}></Stack.Screen>

      </Stack.Navigator>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#372873',
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default AppNavigator;
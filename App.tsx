import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import Home from './app/screens/Home'
import Login from './app/screens/Login'
import Register from './app/screens/Register'
import { createNativeStackNavigator } from '@react-navigation/native-stack';





const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <AuthProvider>
      <Layout>

      </Layout>
    </AuthProvider>
  );
}

export const Layout = () => {  
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>        
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {authState?.authenticated ? (
        <Stack.Screen 
          name="Home" 
          component={Home}
          options ={{
            headerRight: () => <Button onPress={onLogout} title="Sign Out" />, //lo vamos a dejar porque no hace daño
          }}>
        </Stack.Screen>
      ) : (
        
        <>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='Register' component={Register}></Stack.Screen>        
        </>   
        
      )}   
        
      </Stack.Navigator>
    </NavigationContainer>
  
);
};
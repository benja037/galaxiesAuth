import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import Subjects from './Subjects';
import SubjectDetailScreen from './Subjects_detail';



export type RootStackParamList = {
  'Subjects': {subject_id:string,subject_name:string};
  'Subjects_detail':{subject_id:string};
  'Profile':undefined;
};
const Stack2 = createNativeStackNavigator<RootStackParamList>();
const Home = () => {
  return (
     
    <Stack2.Navigator>
      <Stack2.Screen name='Subjects' component={Subjects}></Stack2.Screen>
      <Stack2.Screen name='Subjects_detail' component={SubjectDetailScreen}></Stack2.Screen>
      <Stack2.Screen name='Profile' component={Profile}></Stack2.Screen>
              
        
        
    </Stack2.Navigator>
    
  )
}

export default Home
import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import Subjects from './profesores/Subjects_profesores';

import { useAuth } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store'
import SubjectsAlumnosScreen from './alumnos/Subjects_alumnos';
import SubjectsProfesoresScreen from './profesores/Subjects_profesores';
import SubjectsApoderadosScreen from './apoderados/Subjects_apoderados';
import SubjectDetailProfesoresScreen from './profesores/Subjects_detail_profesores';
import AddSubjectScreen from './profesores/Add_subject';
import AddHorarioScreen from './profesores/Add_horario';
import CourseAlumnosScreen from './alumnos/Courses_alumnos';
import CourseProfesoresScreen from './profesores/Courses_profesores';
import AddCourseScreen from './profesores/Add_course';
import SubjectDetailAlumnosScreen from './alumnos/Subjects_detail_alumnos';
import SubjectDetailApoderadosScreen from './apoderados/Subjects_detail_apoderados';
import HorarioDetailProfesoresScreen from './profesores/Horario_detail_profesores';
import HorarioDetailAlumnosScreen from './alumnos/Horario_detail_alumnos';
import ClaseDetailProfesoresScreen from './profesores/Clase_detail_profesores';
import AddClaseScreen from './profesores/Add_clase';
import AlumnoDetailProfesoresScreen from './profesores/Alumno_perfil';
import EditSubjectAlumnosScreen from './profesores/Edit_subject_alumnos';


export type RootStackParamList = {
  'Courses':any;
  'Add_course':undefined;
  'Subjects': {course_id:string}; //La logica de esto fue que los tenia que tener para poder pasarlos pero no se
  'Add_subject':{course_id:string}; 
  'Subjects_detail':{course_id:string,subject_id:string}; //aca hay que sacar course_id 
  'Edit_subject_alumnos':{subject_id:string};
  'Alumno_perfil':{alumno_id:string}
  'Horario_detail':{horario_id:string}
  'Add_horario':{subject_id:string}
  'Clase_detail':{clase_id:string}
  'Add_clase':{horario_id:string}  
};
const Stack2 = createNativeStackNavigator<RootStackParamList>();
const Home = () => {
   
  const { authState, onLogout } = useAuth();
  return (
     
    <Stack2.Navigator
    screenOptions={{headerStyle:{backgroundColor:'#012677'},
    headerBackTitleVisible:false,
    headerTitleStyle:{
      color: '#fff',
      fontWeight: '600',
    },
    headerTintColor:'blue',
    }}>
    {authState?.user_type === 'profesor' ? (
      <>
      <Stack2.Screen name='Courses' component={CourseProfesoresScreen} options ={{headerRight: () => <Button onPress={onLogout} title="Sign Out" />,}}></Stack2.Screen>
      <Stack2.Screen name='Add_course' component={AddCourseScreen}></Stack2.Screen>
      <Stack2.Screen name='Subjects' component={SubjectsProfesoresScreen} options ={{headerRight: () => <Button onPress={onLogout} title="Sign Out" />,}}></Stack2.Screen>
      <Stack2.Screen name='Add_subject' component={AddSubjectScreen}></Stack2.Screen>
      <Stack2.Screen name='Subjects_detail' component={SubjectDetailProfesoresScreen}></Stack2.Screen>
      <Stack2.Screen name='Horario_detail' component={HorarioDetailProfesoresScreen}></Stack2.Screen>
      <Stack2.Screen name='Alumno_perfil' component={AlumnoDetailProfesoresScreen}></Stack2.Screen>  
      <Stack2.Screen name='Edit_subject_alumnos' component={EditSubjectAlumnosScreen}></Stack2.Screen>  
      <Stack2.Screen name='Add_horario' component={AddHorarioScreen}></Stack2.Screen>  
      <Stack2.Screen name='Clase_detail' component={ClaseDetailProfesoresScreen}></Stack2.Screen>
      <Stack2.Screen name='Add_clase' component={AddClaseScreen}></Stack2.Screen>
      </>  
    ) :         
    authState?.user_type === 'apoderado' ? (
      <>
      <Stack2.Screen name='Subjects' component={SubjectsApoderadosScreen} options ={{headerRight: () => <Button onPress={onLogout} title="Sign Out" />,}}></Stack2.Screen>
      <Stack2.Screen name='Subjects_detail' component={SubjectDetailApoderadosScreen}></Stack2.Screen>
      <Stack2.Screen name='Alumno_perfil' component={Profile}></Stack2.Screen>       
      </>
    ) : (   
      <>
      <Stack2.Screen name='Courses' component={CourseAlumnosScreen} options ={{headerRight: () => <Button onPress={onLogout} title="Sign Out" />,}}></Stack2.Screen>
      <Stack2.Screen name='Subjects' component={SubjectsAlumnosScreen} options ={{headerRight: () => <Button onPress={onLogout} title="Sign Out" />,}}></Stack2.Screen>
      <Stack2.Screen name='Subjects_detail' component={SubjectDetailAlumnosScreen}></Stack2.Screen>
      <Stack2.Screen name='Alumno_perfil' component={Profile}></Stack2.Screen>   
      <Stack2.Screen name='Horario_detail' component={HorarioDetailAlumnosScreen}></Stack2.Screen>
      </>        
    )}
    </Stack2.Navigator>
)}

export default Home
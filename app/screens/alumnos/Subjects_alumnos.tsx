import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import EventList from "../../components/profesores/event-list-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import * as SecureStore from 'expo-secure-store'
import { useAuth } from "../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import axios from "axios";
/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

const SubjectsAlumnosScreen: React.FC<SubjectProps> = ({ navigation, route }) => {
  const { authState } = useAuth();
  const {course_id} = route.params

  const [data,setData] = useState([])
  const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/`;

  useFocusEffect(
    React.useCallback(() => {            
      fetchData2()                     
  },[])
  );
  

 
  
  const fetchData2 = async () => {
    try {
        const token = await SecureStore.getItemAsync('tikin');

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        console.log("ALL subcjects:", response.data);
        setData(response.data );
        //setData(response.data.subjects_from_teacher );
    } catch (error) {
        console.error("Error:", error);
    }
  }

  
  return (
      <View>        
        <Text>Bienvenido {authState?.user_type} que es de alumnos llamado: {authState?.firstname}</Text>
        <EventList data ={data} navigation = {navigation}/>
      </View>
    )
  }



export default SubjectsAlumnosScreen
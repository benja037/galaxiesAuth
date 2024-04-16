import { useEffect, useState } from "react"
import { Button, Text, TouchableOpacity, View } from "react-native"
import EventList from "../../components/event-list-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import {styles} from "../../styles/stylesheet"
import { useAuth } from "../../context/AuthContext";
/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

const SubjectsProfesoresScreen: React.FC<SubjectProps> = ({ navigation, route }) => {   
    const [data,setData] = useState([])
    const { authState } = useAuth();
    const {course_id} = route.params;
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
      <View style = {styles.container}>
        <View style = {styles.container_up}>
          <View style = {styles.box_left}>
            <Text>Bienvenido {authState?.user_type} que es profesor: {authState?.firstname}</Text>        
          </View>  
          <View style = {styles.box_rigth}>
            <TouchableOpacity style={styles.circularbutton} onPress={() => navigation.navigate("Add_subject",{course_id})}>        
              <Text>+</Text>
            </TouchableOpacity>               
          </View>
        </View>
        <View style={styles.container_list}>                
        <EventList data={data} navigation={navigation} route={route} />   
        
        </View> 
       
      </View>
      )
    }



export default SubjectsProfesoresScreen
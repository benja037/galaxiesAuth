import { useEffect, useState } from "react"
import { ActivityIndicator, Button, Text, TouchableOpacity, View } from "react-native"
import EventList from "../../components/profesores/event-list-subjects";
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
    const [loading, setLoading] = useState(true);
    const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/`;
    useFocusEffect(
      React.useCallback(() => {            
        fetchData2()                     
    },[])
  );
    

   
    
    const fetchData2 = async () => {
      try {
          const token = await SecureStore.getItemAsync('tikin');

          const response = await axios.get(url, {});
          console.log("ALL subcjects:", response.data);
          setData(response.data );
          //setData(response.data.subjects_from_teacher );
      } catch (error) {
          console.error("Error:", error);
      } finally {
        setLoading(false);
    }
    }
  
    if (loading) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
    }
    return (
      <View style = {styles.container}>
        <View style = {styles.container_up}>
          <View style = {styles.box_left}>
            <Text>Bienvenido {authState?.user_type} que es profesor: {authState?.firstname}</Text>        
          </View>  
          <View style = {styles.box_right}>
            <TouchableOpacity style={styles.circularbutton} onPress={() => navigation.navigate("Add_subject",{course_id})}>        
              <Text>+</Text>
            </TouchableOpacity>               
          </View>
        </View>
        <View style={styles.container_list}>                
        <EventList data={data} navigation={navigation} />   
        
        </View> 
       
      </View>
      )
    }



export default SubjectsProfesoresScreen
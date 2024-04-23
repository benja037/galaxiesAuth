import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import EventList from "../../components/profesores/event-list-courses";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import * as SecureStore from 'expo-secure-store'
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { styles } from "../../styles/stylesheet";
import { useAuth } from "../../context/AuthContext";
/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type CourseProps = NativeStackScreenProps<RootStackParamList, 'Courses'>;

const CourseAlumnosScreen: React.FC<CourseProps> = ({ navigation, route }) => {
    
    const { authState } = useAuth();    
    const [data,setData] = useState([])
    
    useFocusEffect(
        React.useCallback(() => {        
           
        fetchData2() 
                    
    }, [])
);    

    const fetchData2 = async () => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
      
            const response = await axios.get('https://catolica-backend.vercel.app/apiv1/courses/');
            console.log("data courses:", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <View style = {styles.container}>
        <View style = {styles.container_up}>
          <View style = {styles.box_left}>
            <Text>Bienvenido {authState?.user_type} que es alumno: {authState?.firstname}</Text>        
          </View>            
        </View>
        <View style={styles.container_list}>                
        <EventList data={data} navigation={navigation}/>   
        </View> 
       
      </View>
      )
    }



export default CourseAlumnosScreen
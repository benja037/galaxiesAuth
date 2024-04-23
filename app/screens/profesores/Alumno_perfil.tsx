import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { ScrollView,Text,Button, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";


type DetailAlumnoProps = NativeStackScreenProps<RootStackParamList,'Alumno_perfil'>;

const AlumnoDetailProfesoresScreen: React.FC<DetailAlumnoProps> = ({navigation,route}) => {  
    const { alumno_id } = route.params;
    const [date_of_birth,setDate_of_birth] =useState('')
    const [firstname,setFirstname] =useState('')
    const [lastname,setLastname] =useState('')
    const [gender,setGender] =useState('')
    useFocusEffect(
        React.useCallback(() => {            
        fetchData()                  
        fetchData2()                  
    },[])
    );

    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/listar/students/${alumno_id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("ALUMNO_RETRIEVE",response.data)
            setDate_of_birth(response.data.date_of_birth)
            setFirstname(response.data.firstname)
            setLastname(response.data.lastname)
            setGender(response.data.gender)
           
        } catch (error) {
            console.error("Error:", error);
            
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/listar/students/${alumno_id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("ALUMNO_RETRIEVE",response.data)
            setDate_of_birth(response.data.date_of_birth)
            setFirstname(response.data.firstname)
            setLastname(response.data.lastname)
            setGender(response.data.gender)
           
        } catch (error) {
            console.error("Error:", error);
            
        }
       
    }
    return ( 
        <View>
            <Text>ID: {alumno_id}</Text>           
            <Text>Nombre: {firstname}</Text>           
            <Text>Apellido: {lastname}</Text>           
            <Text>Fecha de Nacimiento: {date_of_birth}</Text>
            <Text>Género: {gender}</Text>
            
        </View>
        
    );
}
export default AlumnoDetailProfesoresScreen;
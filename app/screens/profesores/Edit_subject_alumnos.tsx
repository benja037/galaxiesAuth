import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Home';
import { useFocusEffect } from '@react-navigation/native';
import EventList_alumnos_complete from '../../components/profesores/event-list-alumnos-complete';


type EditSubjectAlumnosProps = NativeStackScreenProps<RootStackParamList, 'Edit_subject_alumnos'>;
const EditSubjectAlumnosScreen = ({ navigation, route }:EditSubjectAlumnosProps) => {
    const { subject_id } = route.params;        
    const [alumnos, setAlumnos] = useState([])  
    useFocusEffect(
        React.useCallback(() => {            
            fetchData();                
        }                
        ,[])
    );
    const fetchData = async () => {
    try {        
        const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/alumnos/`, {});           
        console.log("Fetchdata1");
        setAlumnos(response.data);    
        console.log("ALUMNOS:", response.data);        
    } catch (error) {
        console.error("Error:", error);            
    }
    }

    return (
    <View style ={styles.container}>        
        <EventList_alumnos_complete data2= {alumnos} navigation={navigation}/>
    </View>
  );
};
const styles = StyleSheet.create({
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width:'60%',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',

    },
    container: {
        alignItems: 'center',
        width: '100%',

    },
    button:{
        height:50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#075985'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },


});

export default EditSubjectAlumnosScreen
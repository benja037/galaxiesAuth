import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Home';
import Checkbox from 'expo-checkbox';
import {Picker} from '@react-native-picker/picker';

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Add_subject'>;
const AddSubjectProfesoresScreen = ({ navigation, route }:SubjectProps) => {
    const {discipline_id} = route.params;
    const [subject_name, setSubject_name] = useState('');  
    const [num_max_alumnos,setNum_max_alumnos] = useState('')
    const [mode,setMode] = useState('')

    
    const post_subject = async () => {
        try { 
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/disciplines/${discipline_id}/subjects/`, {subject_name:subject_name,num_max_students:num_max_alumnos,mode:mode
                
            });
            console.log("axios result", response.data)
            navigation.goBack();
            
        } catch (error) {
            console.error("Error:", error);
        }
      };
    /* const handleCheckboxChange = async () => {
        setIspublic(prev=> !prev);
    } */
    return (
    <View style ={styles.container}>        
        <View style={styles.form}>  
            <View style={styles.inputContainer}>
                <Text style={styles.placeholderText}>Nombre Asignatura:</Text>
                <View style={styles.onlyinputContainer}>
                    <TextInput style={styles.input} placeholder="subject_name" onChangeText={(text: string) => setSubject_name(text)} value={subject_name} />    
                </View>
            </View>
        
            <View style={styles.inputContainer}>
                <Text style={styles.placeholderText}>Número Máximo Estudiantes</Text>
                <View style={styles.onlyinputContainer}>       
                    <TextInput style={styles.input} placeholder="num_max_alumnos" onChangeText={(text: string) => setNum_max_alumnos(text)} value={num_max_alumnos} />
                </View>
            </View>
            <View style={styles.pickerRight}>
            <Picker
                selectedValue={mode}
                onValueChange={(itemValue, itemIndex) =>
                setMode(itemValue)
                }>
            <Picker.Item label="público" value="publico" />
            <Picker.Item label="moderado" value="moderado" />
            <Picker.Item label="privado" value="privado" />
            </Picker>                                              
        </View>        
            <Button onPress={post_subject} title="Crear" />
           
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    pickerRight: {
        width:200,
        height:300,        
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:150
    },
    onlyinputContainer: {
        flexDirection: 'column',
        alignItems: 'center',// Ajusta el margen según sea necesario
        width:150,        
        marginLeft:50
    },
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
        height: 40, // Ajusta la altura según sea necesario
        width:250,
        borderColor: '#ccc', // Ajusta el color del borde según sea necesario
        borderWidth: 1, // Ajusta el grosor del borde según sea necesario
        borderRadius: 5, // Ajusta el radio del borde según sea necesario
        paddingHorizontal: 10, // Ajusta el relleno según sea necesario
    },
    placeholderText: {
        width:100,
        marginRight: 10, // Ajusta el margen según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        color: '#333', // Ajusta el color del texto según sea necesario
    },
    container: {
        alignItems: 'flex-start',
        width: '100%',
        marginLeft:5

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
    checkbox: {
        margin: 8,
    },


});

export default AddSubjectProfesoresScreen
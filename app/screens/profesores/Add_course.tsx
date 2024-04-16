import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Home';

type AddCourseProps = NativeStackScreenProps<RootStackParamList, 'Add_course'>;
const AddCourseScreen = ({ navigation, route }:AddCourseProps) => {
    const [course_name, setCourse_name] = useState('');
    //const [subject_name, setSubject_name] = useState('');  
    
    const post_subject = async () => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.post('https://catolica-backend.vercel.app/apiv1/courses/', {course_name:course_name,
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("axios result", response.data)
            navigation.goBack();
            
        } catch (error) {
            console.error("Error:", error);
        }
      };

    return (
    <View style ={styles.container}>        
        <View style={styles.form}>            
            <TextInput style={styles.input} placeholder="course_name" onChangeText={(text: string) => setCourse_name(text)} value={course_name} />            
            <Button onPress={post_subject} title="Crear" />
           
        </View>
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

export default AddCourseScreen
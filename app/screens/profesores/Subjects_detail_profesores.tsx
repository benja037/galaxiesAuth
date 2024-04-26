import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, ActivityIndicator } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos_complete from "../../components/profesores/event-list-alumnos-row";
import HorarioEventList from "../../components/profesores/event-list-horarios";
import { styles } from "../../styles/stylesheet";


import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import EventListProfesores from "../../components/profesores/event-list-profesores";

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface Item {
    id:string;
    horario_id: string;
    time: string;
    day_of_week: string;
  }

const SubjectDetailProfesoresScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    
    const { course_id,subject_id } = route.params;
    const [loading, setLoading] = useState(true);
    const [subject_name,setSubject_name] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/${subject_id}/`;    
    const [alumnos, setAlumnos] = useState([])
    const [profesores, setProfesores] = useState([])
    const [horarios, setHorarios] = useState<Item[]>([]);  
   
    useFocusEffect(
        React.useCallback(() => {
            async function getData() {
                await fetchData();
                await fetchData2();
            }getData()                 
        },[])
        );


    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');  
            const response = await axios.get(url, {});           
            console.log("Fetchdata1");
            console.log("SUBJECT DETAIL:", response.data);
            setAlumnos(response.data.alumnos );
            setSubject_name(response.data.subject_name)
            setProfesores(response.data.profesores)
        } catch (error) {
            console.error("Error:", error);            
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjectss/${subject_id}/horarios/`, {});
           
            console.log("Fetchdata2");
            console.log("SUBJECT HORARIO DETAIL:", response.data);
            setHorarios(response.data);          
        } catch (error) {
            console.error("Error:", error);            
        } finally {
            setLoading(false);
        }
       
    }
    const handleEditButtonPress = () => {
        setIsEditing(!isEditing);
      };
    
    
    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container_header}>
                <Text style={styles.title}>{subject_name}</Text>      
            </View>
            <View>
                <EventListProfesores data={profesores} navigation={navigation}/>
            </View>
                  
            <Text style={styles.subtitle}>Lista de Alumnos</Text>            
            <EventList_alumnos_complete data2={alumnos} navigation = {navigation} />
            <Button title='Editar alumnos' onPress={()=>navigation.navigate('Edit_subject_alumnos',{subject_id})}/>
            <View style={styles.container_horario_title}>
                <View style={styles.box_left_short}>
                    <Text>Horarios</Text>
                </View>
                <View style={styles.box_right}>
                    <Button title='Agregar Horario' onPress={()=>navigation.navigate('Add_horario',{subject_id})}/>
                </View>
                <View style={styles.box_right}>
                    <Button title={isEditing ? "Terminar Edición" : "Editar"} onPress={handleEditButtonPress} />
                </View>
                
            </View>           
            
            <HorarioEventList  data= {horarios} isEditing={isEditing}  navigation= {navigation} />
            
        </ScrollView>
    );
}
 
export default SubjectDetailProfesoresScreen
;

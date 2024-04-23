import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, ActivityIndicator } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos_complete from "../../components/profesores/event-list-alumnos-complete";
import HorarioEventList from "../../components/profesores/event-list-horarios";


import axios from "axios";
import * as SecureStore from 'expo-secure-store'

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface Item {
    id:string;
    horario_id: string;
    time: string;
    day_of_week: string;
  }
/* interface Item {
    id: string;
    horario_id: string;
    time: string;
    day_of_week: string;
  }   

interface DetailSubjectsProps2 extends DetailSubjectsProps{
    horarios:tem[];
}
   */


const SubjectDetailProfesoresScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    
    const { course_id,subject_id } = route.params;
    const [loading, setLoading] = useState(true);
    const [subject_name,setSubject_name] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/${subject_id}/`;    
    const [alumnos, setAlumnos] = useState([])
    const [horarios, setHorarios] = useState<Item[]>([]);
    
    
    
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    /* useEffect(() => {            
            fetchData()  
                           
    },[]); */
    useFocusEffect(
        React.useCallback(() => {
            fetchData()             
            fetchData2()                   
        },[])
        );


    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("==================a======================================================")
            console.log("Fetchdata1");
            setAlumnos(response.data.alumnos );
            setSubject_name(response.data.subject_name)
            console.log("===============================")
           
            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);
            
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjectss/${subject_id}/horarios/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("===============================")
            console.log("Fetchdata2");
            console.log("SUBJECT HORARIO DETAIL:", response.data);
            setHorarios(response.data);
            //setForceUpdate(prevState => !prevState);
            console.log("=============================================================")
            
            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);            
        } finally {
            setLoading(false);
        }
       
    }
    const handleEditButtonPress = () => {
        setIsEditing(!isEditing);
      };
    
    /* const handleUpdate = () => {
        setShouldUpdate(prevState => !prevState);
    }; */
    
      
    
    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>{subject_name}</Text>
            <Button title='Agregar Horario' onPress={()=>navigation.navigate('Add_horario',{subject_id})}/>
            <Text>Lista de Alumnos:</Text>
            <EventList_alumnos_complete data2={alumnos} navigation = {navigation} />
            <Button title={isEditing ? "Terminar Edición" : "Editar"} onPress={handleEditButtonPress} />
            
            <HorarioEventList  data= {horarios} isEditing={isEditing}  navigation= {navigation} />
            
        </ScrollView>
    );
}
 
export default SubjectDetailProfesoresScreen
;
const styles = StyleSheet.create({
    scrollViewContent: {
        paddingVertical: 20,
        paddingHorizontal: 5,
      },
    screen: {
        padding: 20,
    }
})
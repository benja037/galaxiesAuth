import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos_complete from "../../components/event-list-alumnos-complete";
import HorarioEventList from "../../components/event-list-horarios";


import axios from "axios";
import * as SecureStore from 'expo-secure-store'

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;


    
  


const SubjectDetailProfesoresScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    const { course_id,subject_id } = route.params;
    
    

    const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/${subject_id}/`;    
    const [alumnos, setAlumnos] = useState([])
    const [horarios, setHorarios] = useState([])
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
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
            console.log("SUBJECT DETAIL:", response.data);
            setAlumnos(response.data.alumnos );
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
            console.log("SUBJECT HORARIO DETAIL:", response.data);
            setHorarios(response.data);
            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);
        }
       
    }
    const renderAlumnoItem = ({ item }: { item: any }) => (
        <View>
            <Text>{item.id} - {item.admin.firstname} - {item.admin.lastname}</Text> 
        </View>
    );
   
    
    return ( 
        <View style={styles.screen}>
            <Button title='Agregar Horario' onPress={()=>navigation.navigate('Add_horario',{subject_id})}/>
            <Text>Lista de Alumnos:</Text>
            <EventList_alumnos_complete data2={alumnos} navigation = {navigation} route = {route}/> 
            
            <HorarioEventList data= {horarios} navigation = {navigation} route = {route}/>
            
        </View>
    );
}
 
export default SubjectDetailProfesoresScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})
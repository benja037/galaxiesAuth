import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import EventListAsistencias from "../../../../../components/profesores/Disciplines/Subjects/Clases/event-list-asistencias";
import EventListSRowClass from "../../../../../components/profesores/Disciplines/Subjects/Clases/event-list-row-s-class";
import { styles } from "../../../../../styles/stylesheet";

type ClaseDetailProps = NativeStackScreenProps<RootStackParamList,'Clase_detail'>; 


const ClaseDetailProfesoresScreen: React.FC<ClaseDetailProps> = ({navigation,route}) => {  
    const { clase_id,subject_id } = route.params;    
    const [state, setState] = useState('')
    const [date, setDate] = useState('')   
    const [time_start, setTime_start] = useState('')
    const [time_end, setTime_end] = useState('')
    const [asistencias, setAsistencias] = useState([])
    const [alumnos, setAlumnos] = useState([])
    const [teachers, setTeachers] = useState([])
    const [num_max_alumnos, setNum_max_alumnos] = useState('')
    const [mode, setMode] = useState('')
    const [label, setLabel] = useState('')
    
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
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("ClaseDetail:", response.data);
            setDate(response.data.date)          
            setTime_start(response.data.time_start)
            setTime_end(response.data.time_end)
            setState(response.data.state)
            setAlumnos(response.data.students)
            setTeachers(response.data.teachers)
            setNum_max_alumnos(response.data.num_max_students)
            setMode(response.data.mode)
            setLabel(response.data.label)


            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/class/${clase_id}/attendances/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("Asistencias:", response.data);
            setAsistencias(response.data)   
            
        } catch (error) {
            console.error("Error:", error);
        }
       
    }
    /* const add_default = async () => {
        const token = await SecureStore.getItemAsync('tikin');
        await axios.post(`https://catolica-backend.vercel.app/apiv1/class/${clase_id}/attendances/create-default/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
 */
    


    const renderAsistencias = ({ item }: { item: any }) => (
        <View>
            {item.estado == false ?(
            <Text>{item.id} - {item.user_estado_previo} - {item.student_id} - false</Text> )
            :(<Text>{item.id} - {item.user_estado_previo} - {item.student_id} - verdadero</Text>)
        } 

        </View>
    );

    
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>

            <View style={styles.container_header}>
                <View style = {styles.box_header_left}>
                    <Text style={styles.title}>Label: {label}</Text>
                </View>                
            </View> 
            <View style = {styles.box_header_right}>
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("Clase_config",{subject_id,clase_id,num_max_alumnos:num_max_alumnos,mode:mode,label:label,state:state,time_start:time_start,time_end:time_end,date:date})}>        
                    <Text style={styles.text_edit_button}>Configurar</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.box_header_right}>
                <TouchableOpacity style={styles.editbutton} onPress={() => navigation.navigate("Requests_class",{subject_id,clase_id})}>        
                    <Text style={styles.text_edit_button}>Solicitudes</Text>
                </TouchableOpacity>
            </View>
            <View>          
                <EventListSRowClass clase_id={clase_id} subject_id={subject_id} data2= {alumnos} navigation={navigation}/>
                <Button title='Agregar Estudiantes' onPress={()=>navigation.navigate('Edit_clase_alumnos',{subject_id,clase_id})}/>
                <Text>{clase_id} {date} {time_start}  {state}</Text>
                {/* <Button onPress={add_default} title="Agregar lista"/> */}
                <EventListAsistencias subject_id={subject_id} data2={asistencias} navigation={navigation}/>
            </View> 
        </ScrollView>
    );
}
 
export default ClaseDetailProfesoresScreen
;
const styles2 = StyleSheet.create({
    container: { flex: 1 }
  });
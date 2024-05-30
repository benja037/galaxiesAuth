import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, Alert } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import { styles } from "../../../../../styles/stylesheet";
import EventListSRowClass from "../../../../../components/apoderados/Disciplines/Subjects/Clases/event-list-row-s-class";
import { useAuth } from "../../../../../context/AuthContext";

type ClaseDetailProps = NativeStackScreenProps<RootStackParamList,'Clase_detail'>; 


const ClaseDetailApoderadosScreen: React.FC<ClaseDetailProps> = ({navigation,route}) => {  
    const { clase_id,subject_id } = route.params;    
    const { selectedProfile } = useAuth();  
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
    const [request,setRequest] = useState(false);
    const [loading, setLoading] = useState(true);        
    const [isRolled,setIsRolled] = useState(false)
    
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    useFocusEffect(
        React.useCallback(() => {            
        fetchData()                      
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
    const handleInscribirse = async () => {
        try {
            await inscribirse();
            if(mode=='publico'){
                setIsRolled(true);
            }
            if(mode=='moderado'){
                setRequest(true);
            }
            
        } catch (error) {
            console.error("Error al inscribirse:", error);
        }
    }

    const desinscribirseConfirmed  = async () => {
        try {
            await desinscribirse();
            setIsRolled(false);
        } catch (error) {
            console.error("Error al desinscribirse:", error);
        }
    }

    const inscribirse = async () => {        
        await axios.post(`https://catolica-backend.vercel.app/apiv1/apoderados/subjects/${subject_id}/class/${clase_id}/students-auto-add/?student_id=${selectedProfile?.id}`,{});
    }

    const desinscribirse = async () => {        
        await axios.delete(`https://catolica-backend.vercel.app/apiv1/apoderados/subjects/${subject_id}/class/${clase_id}/students-auto-remove/`, {
            params: {student_id: selectedProfile?.id}
        });
    }
    const handleDesinscribirse = async () => {
        try {
            Alert.alert(
                "Confirmación",
                "¿Estás seguro que deseas desinscribirte?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancelado"),
                        style: "cancel"
                    },
                    { text: "Sí", onPress: () => desinscribirseConfirmed() }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error al desinscribirse:", error);
        }
    }



    if(!isRolled){
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container_header}>
                    <View style={styles.box_header_left}>                                       
                        <Text>{num_max_alumnos}{mode}{state}</Text>
                    </View>
                </View>
                <View style={styles.sub_container}>
                    <Text>{isRolled ? 'Inscrito' : 'No inscrito'}</Text>
                    {mode === 'publico' && alumnos.length < Number(num_max_alumnos) && (
                        <Button title="Inscribirse" onPress={handleInscribirse} />
                    )}
                    {mode === 'moderado' && !request && alumnos.length < Number(num_max_alumnos) && (
                        <Button title="Solicitar Inscribirse" onPress={handleInscribirse} />
                    )}
                    {mode === 'moderado' && request && (
                        <Text>Solicitud en espera</Text>
                    )}
                    {mode === 'privado' && (
                        <Text>Esta Asignatura es privada, solicita directamente a un profesor que te agregue</Text>
                    )}
                    {alumnos.length >= Number(num_max_alumnos) && (
                        <Text>No se pueden inscribir más estudiantes.</Text>
                    )}
                </View>
            </ScrollView>
        );
    } else{
    
    
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container_header}>
                <View style = {styles.box_header_left}>
                    <Text style={styles.title}>Label: {label}</Text>
                </View>                
            </View> 
            <View>
                <Text>{num_max_alumnos}{mode}</Text>                
                <Button title="Desinscribirse" onPress={handleDesinscribirse} />
            </View>
                        
            <Text style={styles.subtitle}>Lista de Alumnos</Text>            
            <View>    
                <Text>{clase_id} {date} {time_start}  {state}</Text>
                <EventListSRowClass data2={alumnos} navigation={navigation} clase_id={clase_id} subject_id={subject_id}/>
                
                
            </View> 
            
            
            
            

            
            
        </ScrollView>
    );
}


    
    
}
 
export default ClaseDetailApoderadosScreen
;
const styles2 = StyleSheet.create({
    container: { flex: 1 }
  });
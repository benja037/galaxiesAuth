import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos from "../../components/profesores/event-list-alumnos";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import ClasesEventList from "../../components/profesores/event-list-clases";

type HorarioDetailProps = NativeStackScreenProps<RootStackParamList,'Horario_detail'>;


    
  


const HorarioDetailAlumnosScreen: React.FC<HorarioDetailProps> = ({navigation,route}) => {  
    const { horario_id } = route.params;   
    const [clases, setClases] = useState([])     
    const [alumnos, setAlumnos] = useState([])
    const [isEnrolled, setIsEnrolled] = useState(true);
    const [time, setTime] = useState('')
    const [day_of_week, setDay_of_week] = useState('')
    
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
   useEffect(() => {
    fetchData();    
}, [isEnrolled]);

    const fetchData = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/horarios/${horario_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("HorarioDetail:", response.data);
            setDay_of_week(response.data.day_of_week)
            setTime(response.data.time)
            setAlumnos(response.data.alumnos_horario );
            setIsEnrolled(response.data.rolled)
            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/horarios/${horario_id}/clases/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("Clases", response.data);
            ;
            setClases(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
       
    }
       
    


    const renderAlumnoItem = ({ item }: { item: any }) => (
        <View>
            <Text>{item.id} - {item.admin.firstname} - {item.admin.lastname}</Text> 
        </View>
    );
    const handleInscribirse = async () => {
        try {
            await inscribirse();
            setIsEnrolled(true);
        } catch (error) {
            console.error("Error al inscribirse:", error);
        }
    }

    const desinscribirseConfirmed  = async () => {
        try {
            await desinscribirse();
            setIsEnrolled(false);
        } catch (error) {
            console.error("Error al desinscribirse:", error);
        }
    }

    const inscribirse = async () => {
        const token = await SecureStore.getItemAsync('tikin');
        await axios.post(`https://catolica-backend.vercel.app/apiv1/horarios/${horario_id}/alumnos-auto/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const desinscribirse = async () => {
        const token = await SecureStore.getItemAsync('tikin');
        await axios.delete(`https://catolica-backend.vercel.app/apiv1/horarios/${horario_id}/alumnos-auto/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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

    
    return ( 
        <View style={styles.screen}>
            <Text>{day_of_week}  {time}</Text>
            <Text>Lista de Alumnos:</Text>
            <FlatList
                data={alumnos}
                keyExtractor={(item) => item.id}
                renderItem={renderAlumnoItem} />  
            {!isEnrolled ? (
            <Button title="Inscribirse" onPress={handleInscribirse} />
            ) : (
            <Button title="Desinscribirse" onPress={handleDesinscribirse} />
            
            )}
            <ClasesEventList data ={clases} navigation= {navigation}/>
             
        </View>
    );
}
 
export default HorarioDetailAlumnosScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})
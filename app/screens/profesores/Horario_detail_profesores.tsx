import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos from "../../components/profesores/event-list-alumnos";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import ClasesEventList from "../../components/profesores/event-list-clases";
import EventList_alumnos_complete from "../../components/profesores/event-list-alumnos-complete";

type HorarioDetailProps = NativeStackScreenProps<RootStackParamList,'Horario_detail'>;


    
  


const HorarioDetailProfesoresScreen: React.FC<HorarioDetailProps> = ({navigation,route}) => {  
    const { horario_id } = route.params;        
    const [alumnos, setAlumnos] = useState([])
    const [clases, setClases] = useState([])
    const [time, setTime] = useState('')
    const [day_of_week, setDay_of_week] = useState('')
    
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    useFocusEffect(
        React.useCallback(() => {            
        fetchData()  
        fetchData2()  
        //fetchData2()                   
    },[])
    );

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
            console.log("ALUMNOS",response.data.alumnos_horario)
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
    

    
    return ( 
        <View style={styles.screen}>
            <Text>{day_of_week}  {time}</Text>
            <Text>Lista de Alumnos:</Text>
            <EventList_alumnos_complete data2={alumnos} navigation = {navigation} />
            <ClasesEventList data={clases} navigation={navigation}/> 
            <Button onPress={()=>navigation.navigate('Add_clase',{horario_id})} title="Añadir"/>
        </View>
     
    );
}
 
export default HorarioDetailProfesoresScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})
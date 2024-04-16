import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

type ClaseDetailProps = NativeStackScreenProps<RootStackParamList,'Clase_detail'>;


    
  


const ClaseDetailProfesoresScreen: React.FC<ClaseDetailProps> = ({navigation,route}) => {  
    const { clase_id } = route.params;    
    const [estado, setEstado] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [asistencias, setAsistencias] = useState([])
    
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
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/clases/${clase_id}/`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("ClaseDetail:", response.data);
            setDate(response.data.date)
            setTime(response.data.time)
            setEstado(response.data.estado)
            
            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);
        }
       
    }
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/clases/${clase_id}/asistencias/`, {
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
    const add_default = async () => {
        const token = await SecureStore.getItemAsync('tikin');
        await axios.post(`https://catolica-backend.vercel.app/apiv1/clases/${clase_id}/asistencias/create-default/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    


    const renderAsistencias = ({ item }: { item: any }) => (
        <View>
            {item.estado == false ?(
            <Text>{item.id} - {item.user_estado_previo} - {item.student_id} - false</Text> )
            :(<Text>{item.id} - {item.user_estado_previo} - {item.student_id} - verdadero</Text>)
        } 

        </View>
    );

    
    return ( 
        <View style={styles.screen}>
            <Text>{clase_id} {date} {time}  {estado}</Text>
            <Button onPress={add_default} title="Agregar lista"/>
            <FlatList
                data={asistencias}
                keyExtractor={(item) => item.id}
                renderItem={renderAsistencias} />  
            
             
        </View>
    );
}
 
export default ClaseDetailProfesoresScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})
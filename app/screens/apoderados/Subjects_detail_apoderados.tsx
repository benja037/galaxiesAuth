import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos from "../../components/event-list-alumnos";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;


    
  


const SubjectDetailApoderadosScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    const { course_id,subject_id } = route.params;
    
    const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/${subject_id}/`;    
    const [alumnos, setAlumnos] = useState([])
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    useFocusEffect(
        React.useCallback(() => {            
        fetchData()                     
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
    

    /* useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Alumnos y Asistencias",
            headerLeft: () => (
                <HeaderBackButton
                    tintColor="green"                    
                    onPress={()=> navigation.goBack()}
                    labelVisible={false}
                    />
            )
        })
    }) */


    const renderAlumnoItem = ({ item }: { item: any }) => (
        <View>
            <Text>{item.id} - {item.admin.firstname} - {item.admin.lastname}</Text> 
        </View>
    );

    
    return ( 
        <View style={styles.screen}>
            <Text>Lista de Alumnos:</Text>
            <FlatList
                data={alumnos}
                keyExtractor={(item) => item.id}
                renderItem={renderAlumnoItem} />  
        </View>
    );
}
 
export default SubjectDetailApoderadosScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})
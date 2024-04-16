import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, Alert } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import React from "react";
import EventList_alumnos from "../../components/event-list-alumnos";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import HorarioEventList from "../../components/event-list-horarios";

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

const SubjectDetailAlumnosScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    const { course_id,subject_id } = route.params;
    const [isEnrolled, setIsEnrolled] = useState(true);
    const [loading, setLoading] = useState(true);
    const url = `https://catolica-backend.vercel.app/apiv1/courses/${course_id}/subjectss/${subject_id}/`;    
    const [alumnos, setAlumnos] = useState([])
    const [horarios, setHorarios] = useState([])
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    /* useFocusEffect(
        React.useCallback(() => {            
        fetchData()                     
    },[])
    ); */
    useEffect(() => {
        fetchData();
        fetchData2();
    }, [isEnrolled]);

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
            setIsEnrolled(response.data.rolled)
            setLoading(false);
            //setData(response.data.subjects_from_teacher );
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
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
        await axios.post(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/alumnos-auto/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const desinscribirse = async () => {
        const token = await SecureStore.getItemAsync('tikin');
        await axios.delete(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/alumnos-auto/`, {
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
    if (loading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    
    return ( 
        <View style={styles.screen}>
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
            <HorarioEventList data= {horarios} navigation = {navigation} route = {route}/>
        </View>
    );
}
 
export default SubjectDetailAlumnosScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})


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
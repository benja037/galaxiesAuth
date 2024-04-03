import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Home";
import React from "react";
import EventList_alumnos from "../components/event-list-alumnos";

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface SubjectDetailItemProps extends DetailSubjectsProps{    
    data2?: any;    
    //navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }


const SubjectDetailScreen: React.FC<SubjectDetailItemProps> = ({navigation,route}) => {  
    const { subject_id } = route.params;
    const objectString = JSON.stringify(subject_id);
    const encodedObjectString = encodeURIComponent(objectString);
    const urlString = `https://catolica-backend.vercel.app/auth/listar/subjects/${encodedObjectString}/attendance/`;
    const [asistencias, setAsistencias] = React.useState<any[]>([]);
    const [alumnos, setAlumnos] = React.useState<any[]>([]);
   // const [data2, setData2] = React.useState<any>(null); // Usando un estado para almacenar los datos obtenidos
    useEffect(() => {      
        fetchData()
        
        
    }, [])

    const fetchData = async() => {
        //const urlString = 'https://catolica-backend.vercel.app/auth/listar/subjects/'+ {subject_id}+'/attendance/' // Your string URL
        const response = await fetch(new URL(urlString))
        console.log("respoonse",response)
        const data = await response.json()
        console.log("data_listar:", data)
        setAsistencias(data.Asistencias);
        setAlumnos(data.lista_alumnos);
        
        
  
    }
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Alumnos y Asistencias",
            headerLeft: () => (
                <HeaderBackButton
                    tintColor="white"                    
                    onPress={()=> navigation.goBack()}
                    label = "previous"
                    />
            )
        })
    })
    const renderAsistenciaItem = ({ item }: { item: any }) => (
        <View>
            <Text>{item.dateandhour}</Text>
        </View>
    );

    const renderAlumnoItem = ({ item }: { item: any }) => (
        <View>
            <Text>{item.id} - {item.admin.firstname} - {item.admin.lastname}</Text> 
        </View>
    );

    
    return ( 
        <View style={styles.screen}>
            <Text>Asistencias:</Text>
            <FlatList
                data={asistencias}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAsistenciaItem}
            />

            <Text>Lista de Alumnos:</Text>
            <FlatList
                data={alumnos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderAlumnoItem}
            />
        </View>
    );
}
 
export default SubjectDetailScreen
;
const styles = StyleSheet.create({
    screen: {
        padding: 20,
    }
})
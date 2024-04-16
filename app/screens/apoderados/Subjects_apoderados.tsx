import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import EventList from "../../components/event-list-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Home";
import * as SecureStore from 'expo-secure-store'
/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

const SubjectsApoderadosScreen: React.FC<SubjectProps> = ({ navigation, route }) => {
    
   
    const [data,setData] = useState([])
    const[user_type_display,setUser_type_display] = useState("")
    useEffect(() => {        
        fetchData1()   
        fetchData2()             
    }, [])
    

    const fetchData1 = async() => {
        try {
          const u_type = await SecureStore.getItemAsync('user_type');
          if (u_type !== null) {
            setUser_type_display(u_type);
        } else {
            console.log("No se encontró ningún valor almacenado para 'u_type'.");
        }
        } catch (error) {
          console.error('Error al obtener el valor almacenado:', error);
        }
        }
    const fetchData2 = async()=>{
        const response = await fetch('https://catolica-backend.vercel.app/apiv1/listar/subjects')
        const data = await response.json()
        //console.log("data:", data)
        setData(data)
  
    }
    return (
        <View>        
          <Text>Bienvenido {user_type_display} que es apoderados</Text>
          <EventList data ={data} navigation = {navigation} route= {route}/>
        </View>
      )
    }



export default SubjectsApoderadosScreen
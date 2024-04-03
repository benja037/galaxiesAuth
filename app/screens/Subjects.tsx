import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import EventList from "../components/event-list";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Home";

/* interface SubjectProps {    
    navigation: NativeStackNavigationProp<RootStackParamList>;
  } */

type SubjectProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

const Subjects: React.FC<SubjectProps> = ({ navigation, route }) => {

   
    const [data,setData] = useState([])

    useEffect(() => {      
        fetchData()
        
        
    }, [])

    const fetchData = async() => {
        const response = await fetch('https://catolica-backend.vercel.app/auth/listar/subjects')
        const data = await response.json()
        console.log("data:", data)
        setData(data)
  
    }
    return (
        <View>        
          <Text> SUBJECTS</Text>
          <EventList data ={data} navigation = {navigation} route= {route}/>
        </View>
      )
    }



export default Subjects
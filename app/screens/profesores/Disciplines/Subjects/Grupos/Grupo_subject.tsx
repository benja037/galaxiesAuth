import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect,useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../Home";
import React from "react";
import GrupoEventList from "../../../../../components/profesores/Disciplines/Subjects/Grupos/event-list-grupos";
import { styles } from "../../../../../styles/stylesheet";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import moment from 'moment';
import 'moment/locale/es';


type DetailSubjectsProps = any;

interface Item {
    id:string;    
    name:string;
  }


const GrupoSubjectProfesoresScreen: React.FC<DetailSubjectsProps> = ({navigation,route}) => {  
    
    const { subject_id } = route.params;    
    
    const [grupos, setGrupos] = useState<Item[]>([]);  


    useFocusEffect(
        React.useCallback(() => {
        fetchData2(); 
        },[])
    );


    


    
    const fetchData2 = async() => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
  
            const response = await axios.get(`https://catolica-backend.vercel.app/apiv1/subjects/${subject_id}/groups/`, {});
           
            console.log("Fetchdata2");
            console.log("Grupos:", response.data);
            setGrupos(response.data);          
        } catch (error) {
            console.error("Error:", error);            
        }
       
    }
    

    
    return ( 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container_header}>
                <View style = {styles.box_header_left}>
                    <Text style={styles.title}>Grupos</Text>
                </View>                
            </View>             
            <GrupoEventList data={grupos} navigation={navigation} subject_id={subject_id} />  
            <View style={styles.box_right}>
                <Button title='Agregar Grupo' onPress={()=>navigation.navigate('Add_grupo',{subject_id})}/>
            </View> 
      
            
        
         

        </ScrollView>
    );

}
 
export default GrupoSubjectProfesoresScreen
;
const styles2 = StyleSheet.create({
    container: { 
        flex: 1 
    },
    container_class : {               
        marginBottom:5,
        backgroundColor:"#e8e9d8"
        
    },
    container_boxes_row : {               
        width:'95%',
        height:'8%',      
        flexDirection:'row',
        flexWrap:'wrap',     
    },
}
);
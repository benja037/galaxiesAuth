
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../screens/Home";
import Checkbox from 'expo-checkbox';
import axios from "axios";
import * as SecureStore from 'expo-secure-store'

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosProps {
    alumno_id: string;
    asistencia_id: string;
    firstname:string;
    lastname:string;
    estado:boolean;
    user_estado_previo:string;
    navigation: NativeStackNavigationProp<RootStackParamList>;
  }

const EventItemAlumnosAsistencias: React.FC<EventItemAlumnosProps> = ({asistencia_id,alumno_id,firstname,lastname,estado,user_estado_previo, navigation }) => {
    const [isChecked, setIsChecked] = useState(estado);
    const handleCheckboxChange = async () => {
        if (isChecked==false){
            setIsChecked(true); // Cambia el estado del checkbox
            console.log("estadoo_ischecked",isChecked)
            // Aquí colocarías la lógica para hacer la solicitud PUT
            try {
                const token = await SecureStore.getItemAsync('tikin');
    
                const response = await axios.put(`https://catolica-backend.vercel.app/apiv1/asistencias/${asistencia_id}/`, {estado:true,
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                console.log("PUT:", response.data);            
        
            } catch (error) {
                console.error("Error:", error);            
            } 
        } else {
            setIsChecked(false); // Cambia el estado del checkbox
            console.log("estadoo_ischecked",isChecked)
            try {
                const token = await SecureStore.getItemAsync('tikin');
    
                const response = await axios.put(`https://catolica-backend.vercel.app/apiv1/asistencias/${asistencia_id}/`, {estado:false,
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                console.log("PUT:", response.data);            
        
            } catch (error) {
                console.error("Error:", error);            
            } 
        }
    }
    return (      
        
        <View style={styles.row}>
            <View style={styles.box_left}>
                <Text>{firstname} {lastname} {estado}</Text>
                
            </View> 
            <View style={styles.box_right}>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={handleCheckboxChange} />
            </View>
        </View>
            
       
       
     );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        padding: 10,
    },
    checkbox: {
        margin: 8,
    },
    row:{
        flexDirection:'row',
        flexWrap:'wrap', 
        backgroundColor:'#fff'

    },
    box_left: {        
        width: '80%',
        height: '100%',
        padding:5,

        
        // justifyContent: 'center',
    },
    box_right: {        
        width: '20%',
        height: '100%',
        padding:5,
        
        // justifyContent: 'center',
},
})

export default EventItemAlumnosAsistencias;

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image, Button, Alert } from "react-native";
import { RootStackParamList } from "../../screens/Home";
import {styles_card_horario} from "../../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'
import axios from "axios";
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface HorarioEventItemProps {    
    horario_id: string;
    time:string;
    day_of_week:string;     
    showDeleteButton:boolean;
    navigation: NativeStackNavigationProp<RootStackParamList>;
 
}


const HorarioEventItem: React.FC<HorarioEventItemProps> = ({horario_id,time,day_of_week,showDeleteButton,navigation}) => {
    //const {subject_id} = route.params || {}
    const [itemDeleted, setItemDeleted] = useState(false);
    const handleDeletePress = async () => {
        // Aquí puedes manejar la lógica para eliminar el elemento
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
                    { text: "Sí", onPress: () => eliminarConfirmed() }
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error("Error al desinscribirse:", error);
        }
      };
      const eliminarConfirmed  = async () => {
        try {
            await eliminar();
            setItemDeleted(true);
            //setIsEnrolled(false);
        } catch (error) {
            console.error("Error al desinscribirse:", error);
        }
    }
    const eliminar = async () => {
        const token = await SecureStore.getItemAsync('tikin');
        await axios.delete(`https://catolica-backend.vercel.app/apiv1/horarios/${horario_id}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        
        console.log("ELIMINADO",horario_id)
    }
    if (itemDeleted) {
        return null; // No renderizar el componente si showDeleteButton es false
    }
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Horario_detail",{horario_id})}>         
            <View style={styles_card_horario.container}>
                <View style={styles_card_horario.cardContainer}>                      
                        <View style={styles_card_horario.infoStyle}>
                            {showDeleteButton && <Button title="Eliminar" onPress={handleDeletePress} />}
                            <Text style={styles_card_horario.titleStyle}>{day_of_week} {time}</Text>
                            <Text style={styles_card_horario.categoryStyle}>{horario_id}</Text>

                            <View style={styles_card_horario.iconLabelStyle}>
                            </View>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
       
     );
}




export default HorarioEventItem;
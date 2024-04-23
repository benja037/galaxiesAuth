
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image } from "react-native";
import { RootStackParamList } from "../../screens/Home";
import {styles_card_horario} from "../../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface ClasesEventItemProps {    
    clase_id: string;
    date:string;
    time:string;
    estado:string;     
    navigation: NativeStackNavigationProp<RootStackParamList>;
 
}


const ClasesEventItem: React.FC<ClasesEventItemProps> = ({clase_id,estado,date,time,navigation}) => {
    //const {subject_id} = route.params || {}
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Clase_detail",{clase_id})}>         
            <View style={styles_card_horario.container}>
                <View style={styles_card_horario.cardContainer}>                      
                        <View style={styles_card_horario.infoStyle}>
                            <Text style={styles_card_horario.titleStyle}>{clase_id}</Text>
                            <Text style={styles_card_horario.categoryStyle}>{date} {time} {estado}</Text>

                            <View style={styles_card_horario.iconLabelStyle}>
                            
                            </View>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
       
     );
}




export default ClasesEventItem;
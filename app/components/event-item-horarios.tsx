
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image } from "react-native";
import { RootStackParamList } from "../screens/Home";
import {styles_card_horario} from "../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface HorarioEventItemProps {    
    horario_id: string;
    time:string;
    day_of_week:string;     
    navigation: NativeStackNavigationProp<RootStackParamList>;
 
}


const HorarioEventItem: React.FC<HorarioEventItemProps> = ({horario_id,time,day_of_week,navigation}) => {
    //const {subject_id} = route.params || {}
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Horario_detail",{horario_id})}>         
            <View style={styles_card_horario.container}>
                <View style={styles_card_horario.cardContainer}>                      
                        <View style={styles_card_horario.infoStyle}>
                            <Text style={styles_card_horario.titleStyle}>{horario_id}</Text>
                            <Text style={styles_card_horario.categoryStyle}>{day_of_week} {time}</Text>

                            <View style={styles_card_horario.iconLabelStyle}>
                            <AntDesign name="pushpin" size={24} color="black" />
                            <AntDesign name="pushpin" size={24} color="black" />
                            </View>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
       
     );
}




export default HorarioEventItem;

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View ,Image } from "react-native";
import { RootStackParamList } from "../screens/Home";
import {styles_card} from "../styles/stylesheet"
import { AntDesign } from '@expo/vector-icons';
//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface EventItemProps {
    course_id: string;
    course_name: string;    
    navigation: NativeStackNavigationProp<RootStackParamList>;
 
}


const EventItem: React.FC<EventItemProps> = ({course_id,course_name,navigation}) => {
    //const {subject_id} = route.params || {}
    return (       
        <TouchableOpacity onPress={()=>navigation.navigate("Subjects",{course_id})}>         
            <View style={styles_card.container}>
                <View style={styles_card.cardContainer}>                    
                    <Image style={styles_card.imageStyle} source = {require('../screens/images/Cancha.jpg')} />
                        <View style={styles_card.infoStyle}>
                            <Text style={styles_card.titleStyle}>{course_name}</Text>
                            <Text style={styles_card.categoryStyle}>{course_name}</Text>

                            <View style={styles_card.iconLabelStyle}>
                            <AntDesign name="pushpin" size={24} color="black" />
                            <AntDesign name="pushpin" size={24} color="black" />
                            </View>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
       
     );
}




export default EventItem;
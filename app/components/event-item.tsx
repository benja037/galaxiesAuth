
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../screens/Home";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;
interface EventItemProps {
    subject_id: string;
    subject_name: string;    
    navigation: NativeStackNavigationProp<RootStackParamList>;
 
}


const EventItem: React.FC<EventItemProps> = ({subject_id,subject_name,navigation}) => {
    //const {subject_id} = route.params || {}
    return (       
        <TouchableOpacity style = { styles.card } onPress={()=>navigation.navigate("Subjects_detail",{subject_id})}>
            <Text>{subject_name}</Text>
        </TouchableOpacity>
       
     );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        marginVertical: 5,
        padding: 30,
    }
})

export default EventItem;

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../screens/Home";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosProps {
    id: string;
    admin:any;
    navigation: NativeStackNavigationProp<RootStackParamList>;
  }

const EventItemAlumnos: React.FC<EventItemAlumnosProps> = ({ id, admin, navigation }) => {
    return (       
        <TouchableOpacity style = { styles.card } onPress={()=>{}}>
            
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

export default EventItemAlumnos;
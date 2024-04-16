
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../screens/Home";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosProps {
    alumno_id: string;
    firstname:string;
    lastname:string;
    navigation: NativeStackNavigationProp<RootStackParamList>;
  }

const EventItemAlumnosComplete: React.FC<EventItemAlumnosProps> = ({ alumno_id,firstname,lastname, navigation }) => {
    return (       
        <TouchableOpacity style = { styles.card } onPress={()=>navigation.navigate("Alumno_perfil",{alumno_id})}>
            <View>
                <Text> {alumno_id} {firstname} {lastname}</Text>
            </View>
            
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

export default EventItemAlumnosComplete;
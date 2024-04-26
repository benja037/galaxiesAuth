
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet,Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../screens/Home";

//type ItemDetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventItemAlumnosProps {
    alumno_id: string;
    firstname:string;
    lastname:string;
    navigation: NativeStackNavigationProp<RootStackParamList>;
  }

const EventItemAlumnosComplete: React.FC<EventItemAlumnosProps> = ({ alumno_id,firstname,lastname, navigation }) => {
    return (       
        <TouchableOpacity key ={alumno_id} style = { styles.card } onPress={()=>navigation.navigate("Alumno_perfil",{alumno_id})}>
            <View>
                <Text style={styles.itemText}> {alumno_id} {firstname} {lastname}</Text>
            </View>
            
        </TouchableOpacity>
       
     );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#c5c5c5',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'stretch',
        marginBottom:2,
    },
    itemText: {
        textAlign: 'left',
    },
})

export default EventItemAlumnosComplete;
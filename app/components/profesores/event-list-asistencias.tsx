import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItemAlumnosAsistencias from "./event-item-alumnos-asistencias";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface asistencias {
  id: string;
  student:alumno;
  user_estado_previo:string;
  estado:boolean;
}
interface alumno {
  id: string;
  lastname:string;
  firstname:string;
}



interface EventListAsistenciasProps {
  data2: asistencias[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
  
}
  
  const EventListAsistencias: React.FC<EventListAsistenciasProps> = ({data2,navigation}) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: asistencias }) => (
      <View>
        <EventItemAlumnosAsistencias asistencia_id={item.id} user_estado_previo={item.user_estado_previo} alumno_id={item.student.id} firstname={item.student.firstname} lastname={item.student.lastname} estado={item.estado} navigation={navigation}/>        
      </View>
      );
   
    return ( 
      <View>
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          
        />
      </View>
    );
  };
  
 
export default EventListAsistencias;
import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItemAlumnosComplete from "./event-item-alumnos-complete";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface alumnos {
  id: string;
  lastname:string;
  firstname:string;
}


//Deberia ser subjects no subjects_detail
type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventListProps extends DetailSubjectsProps{
  data2: alumnos[];
  //navigation: NativeStackNavigationProp<RootStackParamList>;
  
}
  
  const EventList_alumnos_complete: React.FC<EventListProps> = ({data2,navigation}) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: alumnos }) => (
      <View>
        <EventItemAlumnosComplete alumno_id={item.id} firstname={item.firstname} lastname={item.lastname} navigation={navigation}/>        
      </View>
      );
   
    return ( 
      <View>
        <FlatList
          data={data2}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => console.log('refreshing...')}
            />
          }
        />
      </View>
    );
  };
  
 
export default EventList_alumnos_complete;
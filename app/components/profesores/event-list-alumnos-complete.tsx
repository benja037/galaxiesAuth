import { Text, View, FlatList, RefreshControl,StyleSheet, Dimensions } from "react-native";
import React from "react";
import EventItemAlumnosComplete from "./event-item-alumnos-complete";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface alumno {
  id: string;
  lastname:string;
  firstname:string;
}



interface EventListAlumnosProps {
  data2: alumno[];
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
const NUM_ROWS = 3;


const EventList_alumnos_complete: React.FC<EventListAlumnosProps> = ({data2,navigation}) => {    
  //console.log("datalistalumnos",data)
  const renderRow = ({ item }: { item: alumno[];index: number }) => (
    <View style={styles.row} >
      {item.map((alumno, index) => (   
        <EventItemAlumnosComplete key = {alumno.id} alumno_id={alumno.id} firstname={alumno.firstname} lastname={alumno.lastname} navigation={navigation}/>
      ))}
    </View>
  );
  const splitDataIntoRows = () => {
    const rows: alumno[][] = [];
    for (let i = 0; i < data2.length; i += NUM_ROWS) {
      const rowData = data2.slice(i, i + NUM_ROWS);
      rows.push(rowData);
    }
    return rows;
  };
   

  return ( 
    <View>
      <FlatList
        data={splitDataIntoRows()}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRow}
          
      />
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    height:150,
    alignItems:"flex-start",
    marginLeft:5,
  },
});  

export default EventList_alumnos_complete;
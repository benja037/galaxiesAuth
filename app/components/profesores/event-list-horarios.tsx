import { Text, View, FlatList, RefreshControl,StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import HorarioEventItem from "./event-item-horarios";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id:string;
    horario_id: string;
    time: string;
    day_of_week: string;
  }
  


interface HorarioListProps {
    data: Item[];
    
    isEditing:boolean;
    
    navigation: NativeStackNavigationProp<RootStackParamList>;    
  }
const sortDataByTime = (data: Item[] | undefined) => {  
  if(data) {
  return data.sort((a, b) => {
    //console.log("SIUUUU",a.time,b.time)
    const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });
}
};
const organizeData = (data: Item[]) => {
  const organizedData: Record<string, Item[]> = {};
  for (const item of data) {
    const dayOfWeek = item.day_of_week;
    if (!organizedData[dayOfWeek]) {
      organizedData[dayOfWeek] = [];
    }
    organizedData[dayOfWeek].push(item);
  }
  return organizedData;
};
  
const HorarioEventList: React.FC<HorarioListProps> = ({ data,isEditing,navigation}) => {
  
  console.log("----------------------ITEM-----------------------------------");
  
  
  
  
  const renderItem = ({ item }: { item: Item }) => (
    <View >
      <HorarioEventItem  horario_id = {item.id} time = {item.time} day_of_week ={item.day_of_week} showDeleteButton={isEditing} navigation={navigation}/>
    </View>
  );
    
    
  const organizedData = organizeData(data);
  console.log("ORGANIZED DATA", organizedData)
  //console.log("LUUUUUNEEEES",organizedData["lunes"])
  const orderedDaysOfWeek: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
  //console.log("KEYY!!",key_change)
  console.log("---------------------FIN Item-------------------------------")
  return (
    <View>
      {orderedDaysOfWeek.map((day) => (
        <View key={day}>
          {/* <Text style={styles.dayHeader}>{day}</Text> */}
          <FlatList
            data={sortDataByTime(organizedData[day])}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()} // Usando el índice como clave única
            //extraData={key_change}
          />
        </View>
      ))}
    </View>
  );
};
  
  
 
export default HorarioEventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  dayHeader: {
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 5,
  },
  
});
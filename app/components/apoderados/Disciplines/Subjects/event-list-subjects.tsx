import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../screens/Home";
import EventItemSubjects from "./event-item-subjects";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id: string;
    subject_name: string;
    discipline_id: string;
    mode:string;
    num_max_students:string;    
    rolled:boolean;
    students: object[];
  }
  


interface EventListSubjectsProps {
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const EventList: React.FC<EventListSubjectsProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <EventItemSubjects subject_id={item.id} subject_name={item.subject_name} navigation={navigation} mode={item.mode} num_max_students={item.num_max_students} cant_estudiantes_actuales={item.students.length} rolled={item.rolled}/>
      </View>
    );
  
    return (
      <View>
        <FlatList
          data={data}
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
  
 
export default EventList;
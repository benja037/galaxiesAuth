import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id: string;
    subject_name: string;
    course_id: string;
  }
  


interface EventListSubjectsProps {
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const EventList: React.FC<EventListSubjectsProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <EventItem subject_id={item.id} subject_name={item.subject_name} course_id ={item.course_id} navigation={navigation}/>
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
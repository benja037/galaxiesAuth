import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-courses";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id: string;
    course_name: string;
  }
  


interface EventListCoursesProps{
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const EventList: React.FC<EventListCoursesProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <EventItem course_id={item.id} course_name={item.course_name} navigation={navigation}/>
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
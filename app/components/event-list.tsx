import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id: string;
    subject_name: string;
  }
  
type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList, 'Subjects'>;

interface EventListProps extends DetailSubjectsProps{
    data: Item[];
    //navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const EventList: React.FC<EventListProps> = ({ data,navigation } :EventListProps) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <EventItem subject_id={item.id} subject_name={item.subject_name} navigation={navigation}/>
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
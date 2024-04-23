import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item-subjects";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
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
  
  const EventList_alumnos: React.FC<EventListProps> = ({data2,navigation }) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: alumnos }) => (
      <View>
        <Text> {item.id}  {item.firstname} {item.lastname} </Text>
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
  
 
export default EventList_alumnos;
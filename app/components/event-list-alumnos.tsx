import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import EventItem from "./event-item";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface alumnos {
  id: string;
  username:string;
  firstname:string;
}

interface Item {
  id: string;
  alumnos: alumnos[];
}

type DetailSubjectsProps = NativeStackScreenProps<RootStackParamList,'Subjects_detail'>;

interface EventListProps extends DetailSubjectsProps{
  data2: Item[];
  //navigation: NativeStackNavigationProp<RootStackParamList>;
  
}
  
  const EventList_alumnos: React.FC<EventListProps> = ({data2,navigation }) => {    
    //console.log("datalistalumnos",data)
    const renderItem = ({ item }: { item: Item }) => {
      return (
        <View>
          <Text>ID: {item.id}</Text>
          <FlatList
            data={item.alumnos}
            keyExtractor={(alumno) => alumno.id}
            renderItem={({ item: alumno }) => (
              <View>
                <Text>Username: {alumno.username}</Text>
                <Text>First Name: {alumno.firstname}</Text>
              </View>
            )}
          />
        </View>
      );
    };
      
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
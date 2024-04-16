import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";
import HorarioEventItem from "./event-item-horarios";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/Home";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id:string;
    horario_id: string;
    time: string;
    day_of_week: string;
  }
  
type HorarioProps = NativeStackScreenProps<RootStackParamList, 'Subjects_detail'>;

interface HorarioListProps extends HorarioProps{
    data: Item[];
    //navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const HorarioEventList: React.FC<HorarioListProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <HorarioEventItem  horario_id = {item.id} time = {item.time} day_of_week ={item.day_of_week} navigation={navigation}/>
      </View>
    );
  
    return (
      <View style={{ height: 300 }}>
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
  
 
export default HorarioEventList;
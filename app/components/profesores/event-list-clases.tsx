import { Text, View, FlatList, RefreshControl } from "react-native";
import React from "react";

import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../screens/Home";
import ClasesEventItem from "./event-item-clases";
//import { RootStackParamList } from "../screens/Home";

interface Item {
    id:string;
    date: string;
    time:string;
    estado: string;    
  }  

interface ClaseListProps {
    data: Item[];
    navigation: NativeStackNavigationProp<RootStackParamList>;
    
  }
  
  const ClasesEventList: React.FC<ClaseListProps> = ({ data,navigation }) => {
    
    const renderItem = ({ item }: { item: Item }) => (
      <View>
        <ClasesEventItem  clase_id = {item.id} date = {item.date} time={item.time} estado ={item.estado} navigation={navigation}/>
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
  
 
export default ClasesEventList;
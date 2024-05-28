import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity,StyleSheet,Image  } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Home';


type Choose_studentProps = NativeStackScreenProps<RootStackParamList, 'Choose_student'>;
const MustChooseStudentProfileApoderadosScreen = ({ navigation }: Choose_studentProps) => {
  const { profiles, fetchProfiles, selectProfile } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
    if (fetchProfiles) {
      fetchProfiles();
    }
  },[])
);

  const handleProfileSelect = async (profile: any) => {
    if (selectProfile) {
      await selectProfile(profile);
    }
  };

  return (
    <View style={styles2.container}>
      <View style={styles2.block_header}>
        {/* Block header content */}
      </View>
      <View style={styles2.container_profiles}>
        <Text>Escoge el estudiante</Text>
      </View>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProfileSelect(item)} style={styles2.profileContainer}>
            <View style={styles2.imageContainer}>
            <Image source = {require('../../images/imagen-perfil.png')} style={styles2.profileImage}/>
            </View>
            <Text>{item.firstname} {item.lastname}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Check_rut")} style={styles2.addButton}>
        <Text style={styles2.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_profiles: {
    marginBottom: 5,
    backgroundColor: "#e8e9d8"
  },
  block_header: {
    marginBottom: 5,
    width: '100%',
    height: 100,    
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  imageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,    
    backgroundColor:'#ffff'
  },
  profileName: {
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    marginBottom:60
  },
});
export default MustChooseStudentProfileApoderadosScreen;
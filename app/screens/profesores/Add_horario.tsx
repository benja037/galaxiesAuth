import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Home';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type HorarioProps = NativeStackScreenProps<RootStackParamList, 'Add_horario'>;
const AddHorarioScreen = ({ navigation, route }:HorarioProps) => {
    const {subject_id} = route.params;
    const [selectedDay, setSelectedDay] = useState('lunes');
    const [selectedTime, setSelectedTime] = useState('');
    
    const [time, setTime] = useState(new Date());
    


    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }; 

    const onChange = ({ type }: { type: string },selectedTime:any) => {
        if (type == "set"){
            const currentTime = selectedTime;
            setTime(currentTime);
            
            if (Platform.OS === "android"){
                toggleDatepicker();
                setSelectedTime(formatDate(time));
            }

        } else {
            toggleDatepicker();
        }

    };
    const confirmIOSDate = () =>{
        setSelectedTime(formatDate(time));
        toggleDatepicker();
    };
    const formatDate = (rawDate: Date | string) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = '00';

        

        return `${hours}:${minutes}:${seconds}`;

    };
    
    const post_horario = async () => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
            //console.log("HORAAAAA",{selectedTime})
            //console.log("DAYYY",{selectedDay})
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/subjectss/${subject_id}/horarios/`, {day_of_week:selectedDay,time:selectedTime,
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("HORARIO AGREGADO")
            //console.log("RESPONSE axios result", response)
            //console.log("axios result", response.data)
            navigation.goBack();
            
        } catch (error) {
            console.error("Error:", error);
        }
      };

    return (
    <View style ={styles.container}>        
        <View style={styles.form}>  
        <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue, itemIndex) =>setSelectedDay(itemValue)
            }>
            <Picker.Item label="lunes" value="lunes" />
            <Picker.Item label="martes" value="martes" />
            <Picker.Item label="miercoles" value="miercoles" />
            <Picker.Item label="jueves" value="jueves" />
            <Picker.Item label="viernes" value="viernes" />
            <Picker.Item label="sabado" value="sabado" />
            <Picker.Item label="domingo" value="domingo" />
        </Picker>
        {showPicker && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="time"
            display='spinner'
            value={time}
            onChange={onChange}
            style = {styles.datePicker}
            />
            )}
            {showPicker && Platform.OS === "ios" && (
                <View
                    style = {{ flexDirection:"row",
                    justifyContent: 'space-around'}}
                >
                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        { backgroundColor: "#11182711"}
                    ]}
                    onPress = {toggleDatepicker}
                    >
                        <Text style={[
                            styles.buttonText,
                            { color: "#075985"}
                        ]}
                        >Cancel</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        
                    ]}
                    onPress = {confirmIOSDate}
                    >
                        <Text style={[
                            styles.buttonText,                            
                        ]}
                        >Confirm</Text>

                    </TouchableOpacity>

                </View>
            )}
            {!showPicker && (
                <Pressable onPress = {toggleDatepicker}>
                    
                    <TextInput
                        style={styles.input}
                        placeholder='12:00:00'
                        value = {selectedTime}
                        onChangeText = {setSelectedTime}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleDatepicker}
                        />
                </Pressable>
            )}                       
            <Button onPress={post_horario} title="Crear" />
           
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    image: {
        width:'25%',
        height:'25%',
        resizeMode: 'contain',
    },
    form: {
        gap: 10,
        width:'60%',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',

    },
    container: {
        alignItems: 'center',
        width: '100%',

    },
    button:{
        height:50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#075985'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff"
    },
    datePicker: {
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },


});

export default AddHorarioScreen
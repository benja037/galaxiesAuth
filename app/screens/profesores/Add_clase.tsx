import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Home';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type HorarioProps = NativeStackScreenProps<RootStackParamList, 'Add_clase'>;
const AddClaseScreen = ({ navigation, route }:HorarioProps) => {
    const {horario_id} = route.params;
    const [estado, setEstado] = useState('proximamente');
    //TIME
    const [selectedTime, setSelectedTime] = useState('');    
    const [time, setTime] = useState(new Date());
    

    //DATE
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    
    const [showPicker, setShowPicker] = useState(false);
    const [showPickerTime, setShowPickerTime] = useState(false);

    const toggleTimepicker = () => {
        setShowPickerTime(!showPickerTime)
    }; 
    //TIME
    const onChangeTime = ({ type }: { type: string },selectedTime:any) => {
        if (type == "set"){
            const currentTime = selectedTime;
            setTime(currentTime);
            
            if (Platform.OS === "android"){
                toggleTimepicker();
                setSelectedTime(formatTime(time));
            }

        } else {
            toggleTimepicker();
        }

    };
    //TIME
    const confirmIOSTime = () =>{
        setSelectedTime(formatTime(time));
        toggleTimepicker();

    };
    //TIME
    const formatTime = (rawDate: Date | string) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = '00';

        

        return `${hours}:${minutes}:${seconds}`;

    };
    //DATE
    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }; 
    //DATE
    const onChange = ({ type }: { type: string },selectedDate:any) => {
        if (type == "set"){
            const currentDate = selectedDate;
            setDate(currentDate);
            
            if (Platform.OS === "android"){
                toggleDatepicker();
                setDateString(formatDate(date));
            }

        } else {
            toggleDatepicker();
        }

    };
    //DATE
    const confirmIOSDate = () =>{
        setDateString(formatDate(date));
        toggleDatepicker();
    };
    //DATE
    const formatDate = (rawDate: Date | string) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedMonth  = month < 10 ? `0${month}` : month;
        let formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;

    }
    
    const post_clase = async () => {
        try {
            const token = await SecureStore.getItemAsync('tikin');
            console.log("DATETIME",time)
            
            const response = await axios.post(`https://catolica-backend.vercel.app/apiv1/horarios/${horario_id}/clases/`, {date:dateString,time:selectedTime,estado:estado,
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            console.log("RESPONSE axios result", response)
            console.log("axios result", response.data)
            navigation.goBack();
            
        } catch (error) {
            console.error("Error:", error);
        }
      };

    return (
    <View style ={styles.container}>        
        <View style={styles.form}>  
            {showPicker && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="date"
            display='spinner'
            value={date}
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
                        placeholder='Sat Aug 21 2004'
                        value = {dateString}
                        onChangeText = {setDateString}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleDatepicker}
                        />
                </Pressable>
            )}



            {/* TIME */}
            {showPickerTime && (<DateTimePicker  
            timeZoneName={'America/Santiago'}          
            mode="time"
            display='spinner'
            value={time}
            onChange={onChangeTime}
            style = {styles.datePicker}
            />
            )}
            {showPickerTime && Platform.OS === "ios" && (
                <View
                    style = {{ flexDirection:"row",
                    justifyContent: 'space-around'}}
                >
                    <TouchableOpacity style={[
                        styles.button,
                        styles.pickerButton,
                        { backgroundColor: "#11182711"}
                    ]}
                    onPress = {toggleTimepicker}
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
                    onPress = {confirmIOSTime}
                    >
                        <Text style={[
                            styles.buttonText,                            
                        ]}
                        >Confirm</Text>

                    </TouchableOpacity>

                </View>
            )}
            {!showPickerTime && (
                <Pressable onPress = {toggleTimepicker}>
                    
                    <TextInput
                        style={styles.input}
                        placeholder='12:00:00'
                        value = {selectedTime}
                        onChangeText = {setSelectedTime}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleTimepicker}
                        />
                </Pressable>
            )}   




            <Button onPress={post_clase} title="Crear" />
           
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

export default AddClaseScreen
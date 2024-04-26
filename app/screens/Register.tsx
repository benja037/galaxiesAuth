import { View, Image, Text, Button, StyleSheet, TextInput, Pressable, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
  } from 'formik'

import * as Yup from 'yup';

interface FormData {
    username:string;
    firstname: string;
    lastname: string;
    password:string;
    email:string;
    date_of_birth:string;
    user_type:string;
    gender:string;
}
const initialValues: FormData = {
    date_of_birth:'',
    username:'aaaa',    
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    gender: '',
    user_type: 'alumno',
};
const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(4,'Too short')
        .max(20, 'Too long') 
        .required('Required'),    
    lastname: Yup.string()      
        .required('Required'),
    password: Yup.string()      
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),    
    user_type: Yup.string()
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')],'Tu contraseñas no coinciden')  
});
const Register = () => {
    
    const [date_of_birth, setDate_of_birth] = useState('');
    /* const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const [user_type, setUser_type] = useState('');
    const [gender, setGender] = useState('');  */
    const { onLogin, onRegister } = useAuth();

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    

    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }; 
    
    const confirmIOSDate = () =>{
        setDate_of_birth(formatDate(date));
        toggleDatepicker();
    };
    const formatDate = (rawDate: Date | string) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        let formattedMonth  = month < 10 ? `0${month}` : month;
        let formattedDay = day < 10 ? `0${day}` : day;

        return `${year}-${formattedMonth}-${formattedDay}`;

    }

    const login = async (formData:FormData) => {
        const {  password, email } = formData;
        const result = await onLogin!(email,password);
    /*  if (result && result.error) {
            alert(result.msg);
        } */
        };
    // We automatically call the login after a succesful registration
    const register_post = async (formData:FormData) => {
        const { username,date_of_birth,user_type,firstname, lastname, password, email, gender } = formData;
        console.log("username:",username,"date_of_birth",date_of_birth,user_type,firstname, lastname, password, email, gender)
        //const result = await onRegister!(username,password,email,date_of_birth,user_type,firstname,lastname,gender);
        /* if (result && result.error) {
            console.log(result)
            alert(result.msg);
        } else {
            
            login()
        }  */
    };
   

    return (
    <View style ={styles.container}>
        <Image source = {require('./images/LogoCDUC.png')} style={styles.image}/>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                validateOnChange={false}
                onSubmit={(values) => {     
                    register_post(values);
                }}
            >
                {(props: FormikProps<FormData>) => ( 
                <View>
                    <View style={styles.form}>            
                        {showPicker && (<DateTimePicker  
                        timeZoneName={'America/Santiago'}
                        locale="es"          
                        mode="date"
                        display='spinner'
                        value={date}
                        onChange={(event, selectedDate:any) => {
                            if (event.type === 'set') {
                                const currentDate = selectedDate || date;
                                setDate(currentDate);                                
                                props.setFieldValue('date_of_birth', formatDate(selectedDate));
                            }
                        }}
                        style={styles.datePicker}
                    
                       
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
                                    placeholder=''
                                    value = {date_of_birth}
                                    onChangeText = {props.handleChange('date_of_birth')}
                                    placeholderTextColor={'#11182744'}
                                    editable={false}
                                    onPressIn = {toggleDatepicker}
                                    />
                            </Pressable>
                        )}

                               
                            </View>
                    <View>
                        <TextInput
                        placeholder='firstname'
                        style={styles.input}                        
                        value={props.values.firstname}
                        onChangeText={props.handleChange('firstname')}
                        />
                        {props.errors.firstname && (
                            <Text>{props.errors.firstname}</Text>
                        )}
                    </View>
                    <View>
                        <TextInput
                        placeholder='lastname'
                        style={styles.input}                        
                        value={props.values.lastname}
                        onChangeText={props.handleChange('lastname')}
                        />
                        {props.errors.lastname && (
                            <Text>{props.errors.lastname}</Text>
                        )}                        
                    </View>
                    <View>
                        <TextInput
                        placeholder='email'
                        style={styles.input}                        
                        value={props.values.email}
                        onChangeText={props.handleChange('email')}
                        />
                        {props.errors.email && (
                            <Text>{props.errors.email}</Text>
                        )}                        
                    </View>
                    <View>
                        <TextInput
                        placeholder='password'
                        style={styles.input}                        
                        value={props.values.password}
                        onChangeText={props.handleChange('password')}
                        />
                        {props.errors.password && (
                            <Text>{props.errors.password}</Text>
                        )}                        
                    </View>
                    <View>
                        <TextInput
                        placeholder='gender'
                        style={styles.input}                        
                        value={props.values.gender}
                        onChangeText={props.handleChange('gender')}
                        />
                        {props.errors.gender && (
                            <Text>{props.errors.gender}</Text>
                        )}                        
                    </View>
                    
                            <Button onPress={() => props.handleSubmit()} title="Submit" />
                        </View>

                    )}
                        
                            
            </Formik>
     
        
        {/* <View style={styles.form}>            
            {showPicker && (<DateTimePicker  
            timeZoneName={'America/Santiago'}
            locale="es"          
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
                        value = {date_of_birth}
                        onChangeText = {setDate_of_birth}
                        placeholderTextColor={'#11182744'}
                        editable={false}
                        onPressIn = {toggleDatepicker}
                        />
                </Pressable>
            )}
            <TextInput style={styles.input} placeholder="FirstName" onChangeText={(text: string) => setFirstname(text)} value={firstname} />
            
            <TextInput style={styles.input} placeholder="LastName" onChangeText={(text: string) => setLastname(text)} value={lastname} />
            <TextInput style={styles.input} placeholder="Username" onChangeText={(text: string) => setUsername(text)} value={username} />
            <TextInput style={styles.input} placeholder="email" onChangeText={(text: string) => setEmail(text)} value={email} />            
            <TextInput style={styles.input} placeholder="Type of User" onChangeText={(text: string) => setUser_type(text)} value={user_type} />
            <TextInput style={styles.input} placeholder="Gender" onChangeText={(text: string) => setGender(text)} value={gender} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text:string) => setPassword(text)} value={password}/>
            <Button onPress={register} title="Crear Cuenta" />
            
        </View> */}
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
        width:'65   %',
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

export default Register
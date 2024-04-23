import { View, Image, Text, Button, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL, useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from '@react-navigation/native';

interface LoginScreenProps {
    navigation: any; // Esto puede ser definido de manera más específica
  }

const Login: React.FC<LoginScreenProps> = ({ navigation })=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    /* useEffect(() => {
        const testCall = async () => {
            const result = await axios.post(`${API_URL}/api/token/`);

        }
        testCall();
    }, []) */
  
  const login = async () => {
    const result = await onLogin!(email,password);
    if (result && result.error) {
        alert(result.msg);
    }
  };
  
  // We automatically call the login after a succesful registration
  /* const register = async () => {
    const result = await onRegister!(username,password);
    if (result && result.error) {
        alert(result.msg);
    } else {
        login();
    }
  }; */

    return (
    <View style ={styles.container}>
        <Image source = {require('./images/LogoCDUC.png')} style={styles.image}/>
        <View style={styles.form}>
            <TextInput autoCapitalize="none" style={styles.input} placeholder="Email" onChangeText={(text: string) => setEmail(text)} value={email} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text:string) => setPassword(text)} value={password}/>
            <Pressable style={styles.button} onPress={login}>
                <Text style={styles.textButton}>Ingresar</Text>
            </Pressable>
            <Button onPress={() => navigation.navigate('Register')} title="Registrar" />
            {/* <Button onPress={register} title="Create Account" />    */}
            
            
            
        
      
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    image: {
        width:'50%',
        height:'50%',
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
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,        
        backgroundColor: '#012677',
    },
    textButton:{
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },


});

export default Login
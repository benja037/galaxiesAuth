import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'


interface AuthProps {
    authState?: { token:string | null; authenticated: boolean | null};
    onRegister?: (username:string,password:string,email:string,date_of_birth:string,user_type:string,firstname:string,lastname:string) => Promise<any>;
    onLogin?: (email:string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'tikin'
export const API_URL = 'https://catolica-backend.vercel.app/';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};
 

export const AuthProvider = ({children}: any) =>{
    const [authState,setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored:", token)

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        }
        loadToken();
    },[])

    const register = async(username:string,password:string,email:string,date_of_birth:string,user_type:string,firstname:string,lastname:string) => {
        try{
            return await axios.post('https://catolica-backend.vercel.app/auth/signup/', { username, password,email,date_of_birth,user_type,firstname,lastname});            
        }   catch (e) {
            
            return { error: true, msg: (e as any).response.data};
        }
    };

    const login = async(email:string,password:string) => {
        try{
            console.log("email", email)
            console.log("password", password)
            const result = await axios.post('https://catolica-backend.vercel.app/auth/jwt/create/', {email:email, password:password});            
            console.log("axios result", result.data)

            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            return result;

        }   catch (e) {
            return { error: true, msg: (e as any).response.data.msg};
        }
    };

    const logout = async () => {
        //Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        //Update HTTP HEaders
        axios.defaults.headers.common['Authorization'] = '';

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false
        });

    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState

    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
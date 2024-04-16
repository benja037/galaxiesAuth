import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

 

interface AuthProps {
    authState?: { token:string | null; authenticated: boolean | null; firstname: string | null; user_type: string | null};
    onRegister?: (username:string,password:string,email:string,date_of_birth:string,user_type:string,firstname:string,lastname:string,gender:string) => Promise<any>;
    onLogin?: (email:string, password:string) => Promise<any>;
    onLogout?: () => Promise<any>;
};

const TOKEN_KEY = 'tikin'
const USER_TYPE_KEY = 'user_type'
const FIRSTNAME_KEY = 'f_name'
export const API_URL = 'https://catolica-backend.vercel.app/';
const AuthContext = createContext<AuthProps>({});
export const useAuth = () => { //Despues esto es lo que se exporta
    return useContext(AuthContext);
};
 

export const AuthProvider = ({children}: any) =>{
    const [authState,setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        firstname: string | null;
        user_type: string | null;
    }>({
        token: null,
        authenticated: null,
        firstname:null,
        user_type:null
    });
    
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            const firstname = await SecureStore.getItemAsync(FIRSTNAME_KEY);
            const user_type = await SecureStore.getItemAsync(USER_TYPE_KEY);
            
            //console.log("stored:", token,"u_type:",u_type)

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                    firstname:firstname,
                    user_type:user_type
                });
            }
        }
        loadToken();
    },[])
    // Interceptor de axios para manejar errores de autorización
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            async error => {
                if (error.response && error.response.status === 403) {
                    console.log("1:",error.response,"2",error.response.status)
                    // Redirigir al usuario a la pantalla de inicio de sesión si obtienes un error de autorización
                    logout()
                }
                return Promise.reject(error);
            }
        );

        // Limpia el interceptor cuando el componente se desmonta
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const register = async(username:string,password:string,email:string,date_of_birth:string,user_type:string,firstname:string,lastname:string,gender:string) => {
        try{
            return await axios.post('https://catolica-backend.vercel.app/auth/signup/', { username, password,email,date_of_birth,user_type,firstname,lastname,gender});            
        }   catch (e) {
            
            return { error: true, msg: (e as any).response.data};
        }
    };

    const login = async(email:string,password:string) => {
        try{
            //console.log("email", email)
            //console.log("password", password)
            const result = await axios.post('https://catolica-backend.vercel.app/auth/login/', {email:email, password:password});            
            console.log("axios result", result.data)

            setAuthState({
                token: result.data.token,
                authenticated: true,
                firstname:result.data.firstname,
                user_type:result.data.user_type
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.tokens.access}`;
            
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.tokens.access);
            await SecureStore.setItemAsync(FIRSTNAME_KEY, result.data.firstname);
            await SecureStore.setItemAsync(USER_TYPE_KEY, result.data.user_type);
           
        
            return result;

        }   catch (e) {
            return { error: true, msg: (e as any).response.data.msg};
        }
    };

    const logout = async () => {
        //Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_TYPE_KEY);
        await SecureStore.deleteItemAsync(FIRSTNAME_KEY);

        //Update HTTP HEaders
        axios.defaults.headers.common['Authorization'] = '';

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false,
            firstname:null,
            user_type:null
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
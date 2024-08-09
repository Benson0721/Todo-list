import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await axios.get("/api/user")
                console.log(response.data)
                setUser(response.data)
            } catch (error) {
                console.error('Error checking user login status:', error);
            } finally {
                setLoading(false)
            }
        }
        checkUserLoggedIn()
    }, [])

    const register = async ({ email, username, password }) => {
        const response = await axios.post("api/register", {
            email, username, password
        })
        console.log("register")
        console.log(response.data)
        setUser(response.data)
        
    }
    const login = async ({ username, password }) => {
        const response = await axios.post("api/login", {
            username, password
        })
        console.log(response.data)
        setUser(response.data)

    }
    const logout = async () => {
        const response = await axios.get("api/logout")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuthState() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthStateProvider');
    }

    return context;
}
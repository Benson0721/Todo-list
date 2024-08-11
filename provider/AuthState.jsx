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
                setUser(response.data)
            } catch (error) {
                console.error('Error checking user login status:', error);
            } finally {
                setLoading(false)
            }
        }
        checkUserLoggedIn()
    }, [])

    const signUp = async ({ email, username, password }) => {
        try {
            const response = await axios.post("api/register", {
                email, username, password
            })
            setUser(response.data)
            return response.data
        } catch (e) {
            setUser(null)
            return null
        }

    }
    const login = async ({ username, password }) => {
        try {
            const response = await axios.post("api/login", {
                username, password
            })
            setUser(response.data)//if判斷會立刻行動，setUser是異步，需等待re-render完才更新
            return response.data//立刻回傳讓其判斷登入是否成功
        } catch (e) {
            setUser(null)
            return null
        }

    }
    const logout = async () => {
        const response = await axios.get("api/logout")
        setUser(null)
        return response
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signUp }}>
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
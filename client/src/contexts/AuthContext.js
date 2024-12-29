import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { APP_HOST } from '@env';

const AuthContext = createContext()

const initialState = { isAuthenticated: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuthenticated: true, user: payload.user }
        case "SET_PROFILE":
            return { isAuthenticated: true, user: payload.user }
        case "SET_LOGGED_OUT":
            return { ...initialState }
        default:
            return state
    }
}

export default function AuthContextProvider({ navigation, children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(true)

    const getUserProfile = useCallback(async (token) => {
        const config = { headers: { Authorization: `Bearer ${token}` } }

        await axios.get(`${APP_HOST}auth/user`, config)
            .then((res) => {
                const { status, data } = res
                const { user } = data
                if (status === 200) {
                    dispatch({ type: "SET_PROFILE", payload: { user } })
                }
            })
            .catch(async () => {
                handleLogout()
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true)
            const token = await AsyncStorage.getItem("jwt")
            if (!token) {
                handleLogout()
            } else {
                getUserProfile(token)
            }
        };
        initializeAuth()
    }, [getUserProfile])

    const handleLogout = async () => {
        dispatch({ type: "SET_LOGGED_OUT" })
        await AsyncStorage.removeItem("jwt")
        setLoading(false)
        navigation.navigate('Tabs')
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading, setLoading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import { APP_HOST } from '@env';
import { useNavigation } from '@react-navigation/native';
import Notify from '../../components/Notify/Notify';

const initialState = { username: "", email: "", password: "" }
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SignUpScreen() {

    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [showNotify, setShowNotify] = useState(false)
    const [type, setType] = useState('')
    const [message, setMessage] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            setShowNotify(false)
        }, 5000);
    }, [showNotify])

    const handleChange = (name, val) => setState(s => ({ ...s, [name]: val }))

    const handleSubmit = async () => {
        setLoading(true)

        const { username, email, password } = state

        if (username.trim().length < 3) {
            setType('info')
            setMessage('Invalid Username! Username must be at least 3 characters long')
            setLoading(false)
            setShowNotify(true)
            return;
        }
        if (!isValidEmail(email)) {
            setType('info')
            setMessage('Invalid Email! Please enter a valid email address')
            setLoading(false)
            setShowNotify(true)
            return;
        }
        if (password.trim().length < 6) {
            setType('info')
            setMessage('Invalid Password! Password must be at least 6 characters long')
            setLoading(false)
            setShowNotify(true)
            return;
        }

        await axios.post(`${APP_HOST}auth/register`, { username, email, password })
            .then((res) => {
                const { status } = res
                if (status === 201) {
                    setState(initialState)
                    setType('success')
                    setMessage('User registered succesfully! Go to login page')
                }
            })
            .catch((err) => {
                console.error(err.message)
                setType('success')
                setMessage('An error occurred during registration. Please try again!')
            })
            .finally(() => {
                setLoading(false)
                setShowNotify(true)
            })
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {showNotify && <Notify type={type} message={message} />}
            <View style={styles.pageHeight}>
                <View style={styles.authContainer}>
                    <View>
                        <Text style={{ color: '#0C82BD', textAlign: 'center', fontSize: 25, fontWeight: 600, marginBottom: 5 }}>SIGNUP</Text>
                        <Text style={{ color: '#666', fontWeight: 500, paddingTop: 10, paddingBottom: 8 }}><Text style={{ color: '#0C82BD' }}>*</Text> Username:</Text>
                        <TextInput style={styles.authInput} placeholder="Enter your username" placeholderTextColor="#e7e7e7" cursorColor="#0C82BD" onChangeText={val => handleChange("username", val)} />
                        <Text style={{ color: '#666', fontWeight: 500, paddingTop: 10, paddingBottom: 8 }}><Text style={{ color: '#0C82BD' }}>*</Text> Email:</Text>
                        <TextInput style={styles.authInput} placeholder="Enter your email" placeholderTextColor="#e7e7e7" cursorColor="#0C82BD" onChangeText={val => handleChange("email", val)} />
                        <Text style={{ color: '#666', fontWeight: 500, paddingTop: 10, paddingBottom: 8 }}><Text style={{ color: '#0C82BD' }}>*</Text> Password:</Text>
                        <TextInput style={styles.authInput} secureTextEntry={true} placeholder="Enter your password" placeholderTextColor="#e7e7e7" cursorColor="#0C82BD" onChangeText={val => handleChange("password", val)} />
                    </View>

                    <TouchableOpacity style={styles.authButton} onPress={handleSubmit}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 12 }}>SIGNUP NOW</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ color: '#666' }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#0c82bd', marginLeft: 5 }}>Login Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30
    },
    authContainer: {
        borderColor: '#e7e7e7',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        minHeight: 280,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    authButton: {
        backgroundColor: '#0C82BD',
        width: '100%',
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 30
    },
    authInput: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderWidth: 1,
        color: '#666',
        borderRadius: 8,
        borderColor: '#e7e7e7'
    }
})
import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function AuthDisplay() {

    const navigation = useNavigation()

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <Text style={{ color: '#666' }}>You don't have joined us yet</Text>
                    <Text style={{ color: '#666' }}>Join us now for better experience</Text>
                    <View>
                        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: '#0C82BD' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#666', paddingVertical: 10 }}>- OR -</Text>
                    <View>
                        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
                            <Text style={{ color: '#fff' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    loginButton: {
        borderWidth: 1,
        borderColor: '#0C82BD',
        borderStyle: 'solid',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 30,
    },
    signupButton: {
        backgroundColor: '#0C82BD',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 5
    }
})
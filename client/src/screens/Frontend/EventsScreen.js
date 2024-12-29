import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { SlideInDown, SlideOutLeft } from 'react-native-reanimated';

export default function TodosScreen({ navigation }) {

    const { isAuthenticated } = useAuthContext()

    const [isVisible, setIsVisible] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setIsVisible(true)
            return () => setIsVisible(false)
        }, [])
    );

    const handleOnPress = (screenPath) => {
        if (!isAuthenticated) {
            navigation.navigate('Login')
        }
        else {
            navigation.navigate(screenPath)
        }
    }

    return (
        <>
            {isVisible &&
                <Animated.View
                    entering={SlideInDown}
                    exiting={SlideOutLeft}
                    style={{ flex: 1 }}
                >
                    <View style={styles.pageHeight}>
                        <View>
                            <Image source={require('../../assets/images/todosPage.jpg')} style={{ width: 300, height: 300 }} />
                        </View>
                        {
                            !isAuthenticated &&
                            <View style={styles.loginError}>
                                <Text style={{ color: '#666' }}>Please login to your account before continuing!</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                                    <Text style={{ color: '#0c82bd', textDecorationLine: 'underline' }}>Login or SignUp</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        <View style={styles.todosView}>
                            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Todos Manager</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 12 }}>
                                <TouchableOpacity style={styles.createButton} onPress={() => handleOnPress('CreateTodo')}>
                                    <Text style={{ color: '#fff', fontWeight: 500 }}>Create <EntypoIcon name='plus' size={16} color='#fff' /></Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.createButton} onPress={() => handleOnPress('AllTodos')}>
                                    <Text style={{ color: '#fff', fontWeight: 500 }}>Manage <FeatherIcon name='edit-2' size={16} color='#fff' /></Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        backgroundColor: '#0C82BD',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 30,
        elevation: 5
    },
    loginError: {
        width: '100%',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ff9c9c',
        borderRadius: 8,
        backgroundColor: '#ffdfdf',
        marginBottom: 10,
    },
    todosView: {
        width: '100%',
        backgroundColor: '#0c82bd',
        padding: 10,
        borderRadius: 8,
        elevation: 5
    },
    createButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderStyle: 'solid',
        backgroundColor: '#0c82bd',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 3
    },
})
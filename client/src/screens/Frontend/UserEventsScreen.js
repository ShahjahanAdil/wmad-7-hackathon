import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { APP_HOST } from '@env';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserEventsScreen({ navigation }) {

    const [events, setEvents] = useState([])
    const [showDelModal, setShowDelModal] = useState(false)
    const [delTodoId, setDelTodoId] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            const token = await AsyncStorage.getItem('jwt')
            const config = { headers: { Authorization: `Bearer ${token}` } }

            axios.get(`${APP_HOST}events/all`, config)
                .then(res => {
                    const { status, data } = res
                    if (status === 200) {
                        setEvents(data.events)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    console.error("Events fetching error frontend", err)
                    setLoading(false)
                })
        }
        fetchEvents()
    }, [])

    const handleDeleteConfirmation = (todoID) => {
        setShowDelModal(true)
        setDelTodoId(todoID)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {showDelModal && <ConfirmDelete todos={todos} setTodos={setTodos} setShowDelModal={setShowDelModal} delTodoId={delTodoId} />}

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <View>
                        <Text style={{ color: '#666', fontSize: 16, fontWeight: '600', marginTop: 5, marginBottom: 12 }}>Manage all your events here:</Text>
                    </View>
                    {
                        events.length > 0 ?
                            events.map(event => {
                                return (
                                    <View style={{ backgroundColor: '#eaeae', padding: 5 }}>
                                        <Text style={{ color: '#666' }}>{event.title}</Text>
                                    </View>
                                )
                            }) :
                            <View style={styles.todosMessage}>
                                <Text style={{ color: '#f35e5e' }}>You have no events.</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
                                    <Text style={{ color: '#f35e5e', textDecorationLine: 'underline' }}>Create event now!</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#efefef',
        padding: 10
    },
    todosMessage: {
        padding: 10,
        backgroundColor: '#fde3e3',
        borderWidth: 1,
        borderColor: '#f35e5e',
        borderRadius: 8,
        flexDirection: 'row',
        gap: 3
    }
})
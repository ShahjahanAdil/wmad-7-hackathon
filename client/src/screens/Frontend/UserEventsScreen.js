import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { APP_HOST } from '@env';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function UserEventsScreen({ navigation }) {

    const [events, setEvents] = useState([])
    const [showDelModal, setShowDelModal] = useState(false)
    const [delEventId, setDelEventId] = useState('')
    const [loading, setLoading] = useState(true)

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

    useFocusEffect(
        useCallback(() => {
            fetchEvents()
        }, [])
    );

    const handleDeleteConfirmation = (eventID) => {
        setShowDelModal(true)
        setDelEventId(eventID)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {showDelModal && <ConfirmDelete events={events} setEvents={setEvents} setShowDelModal={setShowDelModal} delEventId={delEventId} />}

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <View>
                        <Text style={{ color: '#666', fontSize: 18, fontWeight: '600', marginTop: 5, marginBottom: 18 }}>Manage all your events here:</Text>
                    </View>
                    {
                        events.length > 0 ?
                            events.map((event, i) => {
                                return (
                                    <View key={i} style={styles.eventBox}>
                                        <Image source={{ uri: event.imageURL }} style={styles.eventImage} />
                                        <View style={{ padding: 10 }}>
                                            <Text style={{ color: '#666', fontWeight: '600' }}>{event.title}</Text>
                                            <Text style={{ color: '#888' }}>{event.description}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', backgroundColor: '#666', padding: 12 }}>
                                            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('EditEvent', { event })}>
                                                <FeatherIcon name='edit-3' size={16} color={'#fff'} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => handleDeleteConfirmation(event?.eventID)}>
                                                <FeatherIcon name='trash-2' size={16} color={'#fff'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }) :
                            <View style={styles.eventsMessage}>
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
    eventsMessage: {
        padding: 10,
        backgroundColor: '#fde3e3',
        borderWidth: 1,
        borderColor: '#f35e5e',
        borderRadius: 8,
        flexDirection: 'row',
        gap: 3
    },
    eventBox: {
        width: '100%',
        minHeight: 150,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    }
})
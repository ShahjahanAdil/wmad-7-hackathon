import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import Animated, { SlideInDown, SlideOutLeft } from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/dist/AntDesign';
import Loader from '../../components/Loader/Loader';
import { APP_HOST } from '@env';
import axios from 'axios';

export default function AllEventsScreen({ navigation }) {

    const [events, setEvents] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            setIsVisible(true)
            return () => setIsVisible(false)
        }, [])
    );

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)

            try {
                const res = await axios.get(`${APP_HOST}events/all-events`)
                if (res.status === 200) {
                    setEvents(res.data.events)
                } else {
                    console.error("Unexpected status code:", res.status);
                }
            } catch (err) {
                console.error("Events fetching error frontend", err)
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {isVisible &&
                    <Animated.View
                        entering={SlideInDown}
                        exiting={SlideOutLeft}
                        style={{ flex: 1 }}
                    >
                        <View>
                            <Text style={{ color: '#333', fontSize: 20, fontWeight: 'bold', marginTop: 5, marginBottom: 18 }}>Public Events:</Text>
                        </View>
                        {events.map((event, index) => (
                            (
                                event.privacy === 'public' &&
                                <TouchableOpacity key={index} style={styles.eventBox} onPress={() => navigation.navigate('EventDetails', { event })}>
                                    <Image source={{ uri: event.imageURL }} style={styles.eventImage} />
                                    <View style={styles.eventDetails}>
                                        <Text style={styles.eventTitle}>{event.title}</Text>
                                        <Text style={{ color: '#666' }}>See details  <FeatherIcon name='arrowright' size={12} color={'#888'} /></Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        ))}
                    </Animated.View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
        padding: 10
    },
    eventBox: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 8
    },
    eventDetails: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8
    },
    eventTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    }
});
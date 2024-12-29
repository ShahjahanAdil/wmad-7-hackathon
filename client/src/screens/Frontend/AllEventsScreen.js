import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Animated, { SlideInDown, SlideOutLeft } from 'react-native-reanimated';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';

export default function AllEventsScreen({ navigation }) {

    const [events, setEvents] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setIsVisible(true)
            return () => setIsVisible(false)
        }, [])
    );

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)

            axios.get(`${APP_HOST}events/all-events`)
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
                        {events.map((event, index) => (
                            <TouchableOpacity key={index} style={styles.eventBox} onPress={() => navigation.navigate('EventDetails', { event })}>
                                <Image source={{ uri: event.imageURL }} style={styles.eventImage} />
                                <View style={styles.eventDetails}>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                </View>
                            </TouchableOpacity>
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
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    eventDetails: {
        padding: 10,
    },
    eventTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    }
});


import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { APP_HOST } from '@env';
import axios from 'axios';

export default function ConfirmDelete({ events, setEvents, setShowDelModal, delEventId }) {

    const [loading, setLoading] = useState(false)

    const handleDelete = (delEventId) => {
        setLoading(true)

        axios.delete(`${APP_HOST}events/delete/${delEventId}`)
            .then(res => {
                const { status } = res
                if (status === 203) {
                    const updatedEvents = events.filter(event => event.eventID !== delEventId)
                    setEvents(updatedEvents)
                }
            })
            .catch(err => {
                console.error("Event deleting error frontend", err)
            })
            .finally(() => {
                setLoading(false)
                setShowDelModal(false)
            })
    }

    return (
        <>
            <View style={styles.deleteBoxContainer}>
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut}
                    style={{ display: 'block' }}
                >
                    <View style={styles.deleteBox}>
                        <Text style={{ color: '#666', fontSize: 16, fontWeight: '600', marginBottom: 10 }}>Are you sure you want to delete this event?</Text>
                        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'flex-end' }}>
                            <TouchableOpacity style={[styles.btns, { backgroundColor: '#666' }]} onPress={() => setShowDelModal(false)}>
                                <Text style={{ color: '#fff' }}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btns, { backgroundColor: '#0c82bd' }]} disabled={loading} onPress={() => handleDelete(delEventId)}>
                                <Text style={{ color: '#fff' }}>{!loading ? 'Yes' : 'Deleting...'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    deleteBoxContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 20, 20, 0.75)',
        position: 'absolute',
        zIndex: 1
    },
    deleteBox: {
        width: 280,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    btns: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8
    }
})
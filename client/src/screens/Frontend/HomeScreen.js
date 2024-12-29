import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import Animated, { SlideInDown, SlideOutLeft } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import RescentEvents from '../../components/RescentEvents/RescentEvents';

export default function HomeScreen() {

    const [isVisible, setIsVisible] = useState(false)

    useFocusEffect(
        useCallback(() => {
            setIsVisible(true)
            return () => setIsVisible(false)
        }, [])
    );

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {isVisible &&
                    <Animated.View
                        entering={SlideInDown}
                        exiting={SlideOutLeft}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.homeTop}>
                            <Image source={require('../../assets/images/event-home-pic.jpg')} style={styles.homeTopImg} />
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                                <Text style={styles.homeTopText}>VISME EVENTS MANAGER</Text>
                                <FeatherIcon name='check-square' size={75} color={'#fff'} />
                            </View>
                        </View>

                        <View style={styles.pageHeight}>
                            <View>
                                <Text style={{ color: '#666', fontSize: 20, fontWeight: 600, marginLeft: 8, marginBottom: 15, marginTop: 10 }}>Our Services:</Text>
                            </View>

                            <View style={styles.eventsContainer}>
                                <View style={{ flexDirection: 'row', gap: 10 }}>
                                    <View style={{ flex: 1, height: 220, borderRadius: 10, elevation: 5 }}>
                                        <Image source={require('../../assets/images/music-event.webp')} style={styles.eventBoxImg} />
                                    </View>
                                    <View style={{ flex: 1, height: 220, borderRadius: 10, elevation: 5 }}>
                                        <Image source={require('../../assets/images/sport-event.webp')} style={styles.eventBoxImg} />
                                    </View>
                                </View>
                                <View style={{ flex: 1, height: 220, borderRadius: 10, elevation: 5 }}>
                                    <Image source={require('../../assets/images/tech-event.webp')} style={styles.eventBoxImg} />
                                </View>
                            </View>

                            <>
                                <UpcomingEvents />
                            </>

                            <>
                                <RescentEvents />
                            </>
                        </View>
                    </Animated.View>
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    homeTopImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    homeTop: {
        position: 'relative',
        width: '100%',
        minHeight: 180,
        backgroundColor: '#0c82bd',
        alignItems: 'center',
        elevation: 10,
    },
    homeTopText: {
        color: '#fff',
        flex: 1,
        fontWeight: 600,
        fontSize: 40,
    },
    eventsContainer: {
        backgroundColor: '#f4f5fa',
        padding: 12,
        borderRadius: 10,
        gap: 10,
        elevation: 5
    },
    eventBoxImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})
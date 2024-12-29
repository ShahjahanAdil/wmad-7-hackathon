import React from 'react'
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native'

export default function RescentEvents() {

    const upcomingEvents = [
        {
            title: 'Tech Conference 2024',
            description: 'A conference focusing on the latest in tech and innovations.',
            date: '2024-03-25',
            location: 'San Francisco, CA',
            category: 'Tech',
            image: require('../../assets/images/music-event.webp')
        },
        {
            title: 'Live Music Festival',
            description: 'A weekend festival featuring live performances from top artists.',
            date: '2024-06-10',
            location: 'New York City, NY',
            category: 'Music',
            image: require('../../assets/images/music-event.webp')
        },
        {
            title: 'Marathon 2024',
            description: 'Annual city marathon event with various distance categories.',
            date: '2024-05-15',
            location: 'Chicago, IL',
            category: 'Sports',
            image: require('../../assets/images/music-event.webp')
        },
        {
            title: 'AI Workshop',
            description: 'Workshop on artificial intelligence for beginners and professionals.',
            date: '2024-04-20',
            location: 'Boston, MA',
            category: 'Tech',
            image: require('../../assets/images/music-event.webp')
        },
        {
            title: 'Outdoor Sports Day',
            description: 'Outdoor event featuring soccer, basketball, and volleyball.',
            date: '2024-07-30',
            location: 'Los Angeles, CA',
            category: 'Sports',
            image: require('../../assets/images/music-event.webp')
        }
    ];


    return (
        <View style={{ marginBottom: 30 }}>
            <View>
                <Text style={{ color: '#666', fontSize: 20, fontWeight: 600, marginLeft: 8, marginBottom: 15, marginTop: 20 }}>Rescent Events:</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                style={{ flex: 1 }}
            >
                {
                    upcomingEvents.map((event, index) => (
                        <View key={index} style={styles.eventBox}>
                            <Image source={event.image} style={styles.eventImage} />
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    eventBox: {
        minWidth: 125,
        minHeight: 125,
        maxWidth: 125,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        overflow: 'hidden',
    },
    eventImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8
    }
});
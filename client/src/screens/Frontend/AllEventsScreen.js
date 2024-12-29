import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { SlideInDown, SlideOutLeft } from 'react-native-reanimated';
import FeatherIcon from 'react-native-vector-icons/dist/AntDesign';
import Loader from '../../components/Loader/Loader';
import { APP_HOST } from '@env';
import axios from 'axios';

export default function AllEventsScreen({ navigation }) {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Tech', 'Music', 'Sports'];

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${APP_HOST}events/all-events`);
            setEvents(res.data.events);
            setFilteredEvents(res.data.events);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredEvents(events);
        } else {
            const filtered = events.filter(event => event.category === category.toLowerCase());
            setFilteredEvents(filtered);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchEvents();
        }, [])
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            {/* Filter Bar */}
            <View style={styles.filterBar}>
                {categories.map((cat, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => filterEvents(cat)}
                        style={[
                            styles.filterButton,
                            selectedCategory === cat && styles.activeFilterButton,
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterBarText,
                                selectedCategory === cat && styles.activeFilterBarText,
                            ]}
                        >
                            {cat}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Events List */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Animated.View entering={SlideInDown} exiting={SlideOutLeft} style={{ flex: 1 }}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            {selectedCategory} Events:
                        </Text>
                    </View>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) =>
                            event.privacy === 'public' ? (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.eventBox}
                                    onPress={() =>
                                        navigation.navigate('EventDetails', { event })
                                    }
                                >
                                    <Image
                                        source={{ uri: event.imageURL }}
                                        style={styles.eventImage}
                                    />
                                    <View style={styles.eventDetails}>
                                        <Text style={styles.eventTitle}>{event.title}</Text>
                                        <Text style={styles.eventLink}>
                                            See details{' '}
                                            <FeatherIcon name="arrowright" size={12} color="#888" />
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ) : null
                        )
                    ) : (
                        <Text style={styles.noEventsText}>
                            No {selectedCategory.toLowerCase()} events available.
                        </Text>
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 12
    },
    filterBar: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        elevation: 3,
        marginBottom: 10,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#f4f4f4',
        borderRadius: 20,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeFilterButton: {
        backgroundColor: '#0c82bd',
        elevation: 5,
    },
    filterBarText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
    },
    activeFilterBarText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 18,
    },
    eventBox: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
    },
    eventImage: {
        width: '100%',
        height: 150,
    },
    eventDetails: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eventTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    eventLink: {
        color: '#666',
        fontSize: 14,
    },
    noEventsText: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
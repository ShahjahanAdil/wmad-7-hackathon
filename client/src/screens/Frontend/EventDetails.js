import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';

export default function EventDetails({ route }) {

    const { event } = route.params

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <View style={styles.eventImageView}>
                        <Image source={event.image} style={styles.eventImage} />
                    </View>
                    <View style={styles.eventDetails}>
                        <Text style={{ color: '#666', fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{event.title}</Text>
                        <View>
                            <Text style={{ color: '#666', fontWeight: '500', fontSize: 16 }}>Description:</Text>
                            <Text style={{ color: '#888' }}>{event.description}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View>
                                <Text style={{ color: '#666', fontWeight: '500' }}>Schedule <FeatherIcon name='clock' size={14} color={'#e00909'} /></Text>
                                <Text style={{ color: '#888' }}>{event.date}</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#666', fontWeight: '500' }}>Location <IonIcon name='location-sharp' size={15} color={'#0065d6'} /></Text>
                                <Text style={{ color: '#888' }}>{event.location}</Text>
                            </View>
                        </View>
                    </View>
                </View>
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
    eventImageView: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15
    },
    eventImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 10
    },
    eventDetails: {
        backgroundColor: '#f4f5fa',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 5
    }
})
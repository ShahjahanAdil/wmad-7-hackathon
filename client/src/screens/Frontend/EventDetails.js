import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'

export default function EventDetails({ route }) {

    const { event } = route.params

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <Text style={{ color: '#333' }}>{event.title}</Text>
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
})
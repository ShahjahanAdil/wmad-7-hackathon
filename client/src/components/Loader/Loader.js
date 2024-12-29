import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loader() {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={'#0C82BD'} />
        </View>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})
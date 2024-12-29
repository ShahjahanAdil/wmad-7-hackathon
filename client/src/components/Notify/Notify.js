import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ADIcon from 'react-native-vector-icons/dist/AntDesign';
import MTIcon from 'react-native-vector-icons/dist/MaterialIcons';
import FDIcon from 'react-native-vector-icons/dist/Feather';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';

export default function Notify({ type, message }) {
    return (
        <Animated.View style={styles.notifyBarContainer}
            entering={SlideInUp.duration(500)}
            exiting={SlideOutUp.duration(500)}
        >
            <View style={styles.notifyBar}>
                {
                    type === 'success' ?
                        <ADIcon name="checkcircle" size={16} color="#32fd00" />
                        : type === 'error' ?
                            <MTIcon name="error" size={18} color="#ff2020" />
                            :
                            <FDIcon name="info" size={16} color="#20abff" />
                }
                <Text style={{ color: '#888' }}>{message}</Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    notifyBarContainer: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        zIndex: 99
    },
    notifyBar: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5
    }
})
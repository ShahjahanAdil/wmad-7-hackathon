import React from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useAuthContext } from '../../contexts/AuthContext'
import SLIIcon from 'react-native-vector-icons/dist/SimpleLineIcons';

export default function ProfileDisplay() {

    const { user, handleLogout } = useAuthContext()

    return (
        <>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <View style={styles.profilePic}>
                        <Text style={{ color: '#888', fontSize: 30, fontWeight: '500' }}>{user.username.slice(0, 1).toUpperCase()}</Text>
                    </View>
                    <Text style={{ color: '#666' }}>Username: {user.username}</Text>
                    <Text style={{ color: '#666' }}>Email: {user.email}</Text>
                    <View>
                        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                            <Text style={{ color: '#fff' }}><SLIIcon name='logout' size={12} color={'#fff'} />  Logout</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    profilePic: {
        backgroundColor: '#eaeaea',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 100,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#d1d1d1',
    },
    logoutBtn: {
        backgroundColor: '#ff5757',
        marginTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
        elevation: 4
    }
})
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { APP_HOST } from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function TodoDetails({ route }) {

    const { todo } = route.params

    const [state, setState] = useState({})
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        setState(todo)
    }, [])

    const data = [
        { key: 'pending', value: 'Pending' },
        { key: 'complete', value: 'Complete' }
    ]

    const handleOnChangeText = (name, val) => setState(s => ({ ...s, [name]: val }))

    const handleUpdate = (todoID) => {
        setLoading(true)
        const updatedTodo = state

        axios.patch(`${APP_HOST}todos/update/${todoID}`, updatedTodo)
            .then(res => {
                const { status } = res
                if (status === 202) {
                    setLoading(false)
                    navigation.navigate('AllTodos')
                }
            })
            .catch(err => {
                console.error("Todo fetching error frontend", err)
                setLoading(false)
            })
    }

    return (
        <View style={styles.pageHeight}>
            <View style={styles.todoEditBox}>
                <Text style={{ color: '#0c82bd', fontWeight: 600, fontSize: 20, textAlign: 'center', marginBottom: 12 }}>Edit Todo <FeatherIcon name='edit-2' size={20} color='#0c82bd' /></Text>
                <View style={{ gap: 10 }}>
                    <View>
                        <Text style={{ color: '#666', marginBottom: 5 }}>Title:</Text>
                        <TextInput style={styles.updateTodoInput} value={state.title} placeholder="Enter title" placeholderTextColor="#e7e7e7" cursorColor="#0C82BD" onChangeText={(val) => handleOnChangeText('title', val)} />
                    </View>
                    <View>
                        <Text style={{ color: '#666', marginBottom: 5 }}>Description:</Text>
                        <TextInput style={styles.updateTodoInput} value={state.description} placeholder="Enter description" placeholderTextColor="#e7e7e7" cursorColor="#0C82BD" onChangeText={(val) => handleOnChangeText('description', val)} />
                    </View>
                    <View>
                        <Text style={{ color: '#666', marginBottom: 5 }}>Status:</Text>
                        <SelectList
                            setSelected={(val) => handleOnChangeText('status', val)}
                            data={data}
                            save="key"
                            defaultOption={data.find(item => item.key === state.status) || data[0]}
                            boxStyles={{ paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderColor: '#e7e7e7' }}
                            inputStyles={{ color: '#666' }}
                            dropdownStyles={{ borderColor: '#e7e7e7' }}
                            dropdownTextStyles={{ color: '#666' }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.updateBtn} disabled={loading} onPress={() => handleUpdate(todo.todoID)}>
                        {
                            !loading ?
                                <Text style={{ color: '#fff' }}>Update <FeatherIcon name='edit-2' size={16} color='#fff' /></Text>
                                :
                                <Text style={{ color: '#fff' }}>Updating...</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    todoEditBox: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
    },
    updateTodoInput: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderWidth: 1,
        color: '#666',
        borderRadius: 8,
        borderColor: '#e7e7e7'
    },
    updateBtn: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: '#0c82bd',
        marginTop: 18,
        borderRadius: 8,
        elevation: 4
    }
})
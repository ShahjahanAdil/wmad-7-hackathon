import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import { APP_HOST } from '@env';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AllTodo({ navigation }) {

    const [todos, setTodos] = useState([])
    const [showDelModal, setShowDelModal] = useState(false)
    const [delTodoId, setDelTodoId] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true)
            const token = await AsyncStorage.getItem('jwt')
            const config = { headers: { Authorization: `Bearer ${token}` } }

            axios.get(`${APP_HOST}todos/all`, config)
                .then(res => {
                    const { status, data } = res
                    if (status === 200) {
                        setTodos(data.todos)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    console.error("Todo fetching error frontend", err)
                    setLoading(false)
                })
        }
        fetchTodos()
    }, [])

    const handleDeleteConfirmation = (todoID) => {
        setShowDelModal(true)
        setDelTodoId(todoID)
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {showDelModal && <ConfirmDelete todos={todos} setTodos={setTodos} setShowDelModal={setShowDelModal} delTodoId={delTodoId} />}

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.pageHeight}>
                    <View>
                        <Text style={{ color: '#666', fontSize: 16, fontWeight: '600', marginTop: 5, marginBottom: 12 }}>Manage all your todos here:</Text>
                    </View>
                    {
                        todos.length > 0 ?
                            todos.map(todo => {
                                return (
                                    <View style={styles.todoBox} key={todo.todoId}>
                                        <View style={styles.todoBoxTop}>
                                            <Text style={{ color: '#666', fontWeight: 600 }}>{todo.title}</Text>
                                        </View>
                                        <View style={styles.todoBoxMid}>
                                            <Text style={{ color: '#888' }}>{todo.description}</Text>
                                        </View>
                                        <View style={styles.todoBoxBottom}>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('TodoDetails', { todo })}>
                                                <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderColor: '#666' }}>
                                                    <FeatherIcon name='edit-2' size={16} color='#0c82bd' />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleDeleteConfirmation(todo.todoID)}>
                                                <View style={{ flex: 1, alignItems: 'center' }}>
                                                    <FeatherIcon name='trash' size={16} color='#ff3131' />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.todoStatus}>
                                            <Text style={{ color: todo.status === 'complete' ? '#08ff00' : '#e1f309' }}>{todo.status}</Text>
                                        </View>
                                    </View>
                                )
                            }) :
                            <View style={styles.todosMessage}>
                                <Text style={{ color: '#f35e5e' }}>You have no todos.</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('CreateTodo')}>
                                    <Text style={{ color: '#f35e5e', textDecorationLine: 'underline' }}>Create todo now!</Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#efefef',
        padding: 10
    },
    todoBox: {
        position: 'relative',
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 20,
        marginBottom: 15,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    todoBoxTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1,
        padding: 10
    },
    todoBoxMid: {
        minHeight: 70,
        maxHeight: 70,
        padding: 10,
        overflow: 'hidden'
    },
    todoBoxBottom: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#3d3d3d',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    todoStatus: {
        position: 'absolute',
        bottom: '95%',
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    todosMessage: {
        padding: 10,
        backgroundColor: '#fde3e3',
        borderWidth: 1,
        borderColor: '#f35e5e',
        borderRadius: 8,
        flexDirection: 'row',
        gap: 3
    }
})
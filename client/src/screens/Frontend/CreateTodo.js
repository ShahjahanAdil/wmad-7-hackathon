import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthContext } from '../../contexts/AuthContext';
import { APP_HOST } from '@env';
import axios from 'axios';
import storage from '@react-native-firebase/storage';

const initialState = { title: '', description: '', image: null };

export default function CreateTodo() {
    const { user } = useAuthContext();
    const userID = user.userID;

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    const handleOnChangeText = (name, val) => setState(s => ({ ...s, [name]: val }));

    const selectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.7 },
            response => {
                if (response.didCancel || response.errorCode) {
                    console.log('Image selection cancelled or failed');
                } else {
                    const image = response.assets[0];
                    setState(s => ({ ...s, image }));
                }
            }
        );
    };

    const uploadImageToStorage = async () => {
        if (!state.image) return null;

        setUploading(true);
        const { uri, fileName } = state.image;
        const storageRef = storage().ref(`/todos/${userID}/${fileName || 'image'}`);
        
        try {
            const task = await storageRef.putFile(uri);
            const url = await storageRef.getDownloadURL();
            setImageURL(url);
            return url;
        } catch (error) {
            console.error('Image upload failed:', error);
        } finally {
            setUploading(false);
        }
        return null;
    };

    const handleCreateTodo = async () => {
        setLoading(true);
        const { title, description } = state;

        if (!title || !description) {
            setLoading(false);
            return;
        }

        const imageURL = await uploadImageToStorage();

        axios.post(`${APP_HOST}todos/create`, { userID, title, description, status: 'pending', imageURL })
            .then(res => {
                const { status } = res;
                if (status === 201) {
                    setState(initialState);
                    setImageURL(null);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Todo create error frontend", err);
                setLoading(false);
            });
    };

    return (
        <View style={styles.pageHeight}>
            <View style={styles.createTodoContainer}>
                <Text style={styles.headerText}>Create Todo</Text>
                <View style={{ gap: 10 }}>
                    <View>
                        <Text style={styles.label}>Title:</Text>
                        <TextInput
                            style={styles.createTodoInput}
                            placeholder="Enter title"
                            placeholderTextColor="#e7e7e7"
                            cursorColor="#0C82BD"
                            value={state.title}
                            onChangeText={(val) => handleOnChangeText('title', val)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Description:</Text>
                        <TextInput
                            style={styles.createTodoInput}
                            placeholder="Enter description"
                            placeholderTextColor="#e7e7e7"
                            cursorColor="#0C82BD"
                            value={state.description}
                            onChangeText={(val) => handleOnChangeText('description', val)}
                        />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                            <Text style={styles.imagePickerText}>Select Image</Text>
                        </TouchableOpacity>
                        {state.image && (
                            <Image
                                source={{ uri: state.image.uri }}
                                style={styles.previewImage}
                            />
                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.createBtn}
                        onPress={handleCreateTodo}
                        disabled={loading || uploading}
                    >
                        <Text style={styles.createBtnText}>
                            {uploading ? 'Uploading...' : loading ? 'Adding...' : 'Create '}
                            <EntypoIcon name="plus" size={16} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    createTodoContainer: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e7e7e7',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 4,
    },
    headerText: {
        color: '#0c82bd',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    label: {
        color: '#666',
        marginBottom: 5,
    },
    createTodoInput: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderWidth: 1,
        color: '#666',
        borderRadius: 8,
        borderColor: '#e7e7e7',
    },
    imagePicker: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: '#0c82bd',
        borderRadius: 8,
        elevation: 4,
    },
    imagePickerText: {
        color: '#fff',
        textAlign: 'center',
    },
    previewImage: {
        marginTop: 10,
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    createBtn: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: '#0c82bd',
        marginTop: 15,
        borderRadius: 8,
        elevation: 4,
    },
    createBtnText: {
        color: '#fff',
    },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import { launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import { useAuthContext } from '../../contexts/AuthContext';
import { APP_HOST } from '@env';
import axios from 'axios';
import storage from '@react-native-firebase/storage';

const initialState = { title: '', description: '', image: null, location: '', category: '', date: new Date() };

export default function CreateEvent() {
    const { user } = useAuthContext();
    const userID = user.userID;

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
        const storageRef = storage().ref(`/events/${userID}/${fileName || 'image'}`);

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

    const handleCreateEvent = async () => {
        setLoading(true);
        const { title, description, location, category, date } = state;

        if (!title || !description || !location || !category || !date) {
            Alert.alert('Input fields error!', 'Please fill all fields')
            setLoading(false);
            return;
        }

        const imageURL = await uploadImageToStorage();

        axios.post(`${APP_HOST}events/create`, {
            userID,
            title,
            description,
            imageURL,
            location,
            category,
            date: date.toISOString()
        })
            .then(res => {
                const { status } = res;
                if (status === 201) {
                    setState(initialState);
                    setImageURL(null);
                    setLoading(false);
                    Alert.alert('Success!', 'Event created successfully')
                }
            })
            .catch(err => {
                console.error("Event create error frontend", err);
                setLoading(false);
                Alert.alert('Error!', 'Something went wrong. Please try again')
            });
    };

    return (
        <View style={styles.pageHeight}>
            <View style={styles.createTodoContainer}>
                <Text style={styles.headerText}>Create Event</Text>
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
                        <Text style={styles.label}>Location:</Text>
                        <TextInput
                            style={styles.createTodoInput}
                            placeholder="Enter location"
                            placeholderTextColor="#e7e7e7"
                            cursorColor="#0C82BD"
                            value={state.location}
                            onChangeText={(val) => handleOnChangeText('location', val)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Category:</Text>
                        <TextInput
                            style={styles.createTodoInput}
                            placeholder="Enter category"
                            placeholderTextColor="#e7e7e7"
                            cursorColor="#0C82BD"
                            value={state.category}
                            onChangeText={(val) => handleOnChangeText('category', val)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Date:</Text>
                        <TouchableOpacity style={styles.datePickerButton} onPress={() => setIsDatePickerOpen(true)}>
                            <Text style={styles.datePickerButtonText}>Select Date</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={isDatePickerOpen}
                            date={state.date}
                            onConfirm={(date) => {
                                setIsDatePickerOpen(false);
                                setState((s) => ({ ...s, date }));
                            }}
                            onCancel={() => setIsDatePickerOpen(false)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Image:</Text>
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
                        onPress={handleCreateEvent}
                        disabled={loading || uploading}
                    >
                        <Text style={styles.createBtnText}>
                            {uploading ? 'Uploading...' : loading ? 'Adding...' : 'Create '}
                            <EntypoIcon name="plus" size={16} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    pageHeight: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    createTodoContainer: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#e7e7e7',
        paddingHorizontal: 10,
        paddingVertical: 15,
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
        fontWeight: 500,
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
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0c82bd',
        marginBottom: 10
    },
    imagePickerText: {
        color: '#0c82bd',
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
    datePickerButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
        backgroundColor: '#eaeaea',
        borderRadius: 8,
    },
    datePickerButtonText: {
        color: '#0c82bd',
        textAlign: 'center',
    }
});
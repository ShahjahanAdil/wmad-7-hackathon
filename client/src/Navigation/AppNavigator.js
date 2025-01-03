import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

// Screens
import HomeScreen from '../screens/Frontend/HomeScreen';
import EventsScreen from '../screens/Frontend/EventsScreen';
import ProfileScreen from '../screens/Frontend/ProfileScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader/Loader';
import EventDetails from '../screens/Frontend/EventDetails';
import CreateEvent from '../screens/Frontend/CreateEvent';
import UserEventsScreen from '../screens/Frontend/UserEventsScreen';
import AllEventsScreen from '../screens/Frontend/AllEventsScreen';
import EditEventScreen from '../screens/Frontend/EditEventScreen';


// Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: '#666',
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ headerTitle: 'Create Event' }} />
            <Stack.Screen name="EditEvent" component={EditEventScreen} options={{ headerTitle: 'Edit Event' }} />
            <Stack.Screen name="UserEventsScreen" component={UserEventsScreen} options={{ headerTitle: 'Manage Events' }} />
            <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerTitle: 'Event Information' }} />
        </Stack.Navigator>
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerTintColor: '#666',
                headerTitleAlign: 'center',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                    <FeatherIcon name='home' size={18} color={focused ? '#0c82bd' : '#666'} />
                ),
                tabBarActiveTintColor: '#0c82bd',
                tabBarInactiveTintColor: '#666',
            }} />
            <Tab.Screen name="AllEvents" component={AllEventsScreen} options={{
                title: 'All Events',
                tabBarIcon: ({ focused }) => (
                    <MaterialIcon name='event' size={18} color={focused ? '#0c82bd' : '#666'} />
                ),
                tabBarActiveTintColor: '#0c82bd',
                tabBarInactiveTintColor: '#666'
            }} />
            <Tab.Screen name="Events" component={EventsScreen} options={{
                title: 'Manage Events',
                tabBarIcon: ({ focused }) => (
                    <EntypoIcon name='list' size={20} color={focused ? '#0c82bd' : '#666'} />
                ),
                tabBarActiveTintColor: '#0c82bd',
                tabBarInactiveTintColor: '#666'
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                title: 'Profile',
                tabBarIcon: ({ focused }) => (
                    <FeatherIcon name='user' size={18} color={focused ? '#0c82bd' : '#666'} />
                ),
                tabBarActiveTintColor: '#0c82bd',
                tabBarInactiveTintColor: '#666'
            }} />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {

    const { loading } = useAuthContext()

    return (
        <NavigationContainer>
            {
                loading ?
                    <Loader />
                    :
                    <StackNavigator />
            }
        </NavigationContainer>
    );
}
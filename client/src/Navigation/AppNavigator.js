import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';

// Screens
import HomeScreen from '../screens/Frontend/HomeScreen';
import EventsScreen from '../screens/Frontend/EventsScreen';
import ProfileScreen from '../screens/Frontend/ProfileScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import { useAuthContext } from '../contexts/AuthContext';
import Loader from '../components/Loader/Loader';
import CreateTodo from '../screens/Frontend/CreateTodo';
import AllTodo from '../screens/Frontend/AllTodos';
import TodoDetails from '../screens/Frontend/TodoDetails';


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
            <Stack.Screen name="CreateTodo" component={CreateTodo} options={{ headerTitle: 'Create Todo' }} />
            <Stack.Screen name="AllTodos" component={AllTodo} options={{ headerTitle: 'Manage Todos' }} />
            <Stack.Screen name="TodoDetails" component={TodoDetails} options={{ headerTitle: 'Todo Details' }} />
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
            <Tab.Screen name="Events" component={EventsScreen} options={{
                title: 'Your Events',
                tabBarIcon: ({ focused }) => (
                    <FeatherIcon name='check-square' size={18} color={focused ? '#0c82bd' : '#666'} />
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
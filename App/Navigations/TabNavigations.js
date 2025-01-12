import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Importing Screens
import HomeScreenNavigation from './HomeScreenNavigation';
import AI_Story from '/Users/yughjuneja/Dhan-Niti/App/Screen/AI_Story.js';
import AI_Assistance from '../Screen/AI_Assistance.js';
import ExpenseTrack from '../Screen/ExpenseTrack.js';
import News from '/Users/yughjuneja/Dhan-Niti/App/Screen/News.js';
import Mentor_Appoint from '/Users/yughjuneja/Dhan-Niti/App/Screen/Mentor_Appoint.js';

const Tab = createBottomTabNavigator();

export default function TabNavigations() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000', // Customize active tab icon color
        tabBarInactiveTintColor: '#ccc', // Customize inactive tab icon color
        tabBarStyle: { height: 60 }, // Adjust tab bar height if necessary
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreenNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
          tabBarLabel: 'Home', // Optional label for better clarity
        }}
      />
      <Tab.Screen
        name='AI Story'
        component={AI_Story}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="book" size={24} color={color} />
          ),
          tabBarLabel: 'AI Story',
        }}
      />
      <Tab.Screen
        name='ExpenseTrack'
        component={ExpenseTrack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="dollar" size={24} color={color} />
          ),
          tabBarLabel: 'Expense Tracker',
        }}
      />
      <Tab.Screen
        name='AI Assistance'
        component={AI_Assistance}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="headphones" size={24} color={color} />
          ),
          tabBarLabel: 'AI Assist',
        }}
      />
      <Tab.Screen
        name='News'
        component={News}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" size={24} color={color} />
          ),
          tabBarLabel: 'News',
        }}
      />
      <Tab.Screen
        name='Mentor Connect'
        component={Mentor_Appoint}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-plus" size={24} color={color} />
          ),
          tabBarLabel: 'Mentor Connect',
        }}
      />
    </Tab.Navigator>
  );
}
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contact from '../screens/contact';
import Setting from '../screens/Setting';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();
export default function HomeNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="contact"
        component={Contact}
        options={{
          title: 'Contact',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          title: 'Setting',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

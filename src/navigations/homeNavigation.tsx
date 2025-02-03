import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contact from '../screens/contact';
import Home from '../screens/Home';
import SettingNavigation from './settingNavigation';

const Tab = createBottomTabNavigator();
export default function HomeNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="hometab"
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
        name="SettingNavigation"
        component={SettingNavigation}
        options={{
          title: 'Setting',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

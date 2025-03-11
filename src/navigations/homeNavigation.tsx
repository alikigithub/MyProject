import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contact from '../screens/Contact/Contact';
import Home from '../screens/Home/Home';
import SettingNavigation from './settingNavigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import Vector Icons

const Tab = createBottomTabNavigator();

const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="message-text-outline" color={color} size={size} />
);
const ContactIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="account-multiple" color={color} size={size} />
);
const SettingsIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="cog-outline" color={color} size={size} />
);

export default function HomeNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: '#fff'},
        tabBarActiveTintColor: '#3D4A7A',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="hometab"
        component={Home}
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="contact"
        component={Contact}
        options={{
          title: 'Contacts',
          headerShown: false,
          tabBarIcon: ContactIcon,
        }}
      />
      <Tab.Screen
        name="SettingNavigation"
        component={SettingNavigation}
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: SettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
}

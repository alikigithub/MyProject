import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Setting from '../screens/Setting';
import ChangePassword from '../screens/ChangePassword';
const Stack = createNativeStackNavigator();
export default function SettingNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{
          title: '',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePassword}
        options={{
          title: '',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

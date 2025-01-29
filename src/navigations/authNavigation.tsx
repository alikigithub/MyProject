import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/splash';
import AuthScreen from '../screens/Auth';
import SignUP from '../screens/signup';
import CustomHeader from '../components/CustomHeader';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Login from '../screens/login';
import HomeNavigation from './homeNavigation';
import ChatScreen from '../screens/Chat';
const Stack = createNativeStackNavigator();
function AuthNavigation() {
  const [user, setuser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setloading] = useState<boolean>(true);

  useEffect(() => {
    auth().onAuthStateChanged(value => {
      setuser(value);
      setTimeout(() => {
        setloading(false);
      }, 3000);
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loading ? (
          <Stack.Screen
            name="Spash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
        ) : user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeNavigation}
              options={{
                title: '',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUP}
              options={{
                title: '',
                header: CustomHeader,
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                title: '',
                header: CustomHeader,
                headerShadowVisible: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;

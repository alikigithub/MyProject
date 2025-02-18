import React, {useEffect, useLayoutEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import AuthScreen from '../screens/Auth';
import SignUP from '../screens/Signup';
import CustomHeader from '../components/CustomHeader';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Login from '../screens/Login';
import HomeNavigation from './homeNavigation';
import ChatScreen from '../screens/Chat';
import ForgetPassword from '../screens/ForgetPassword';
import Searchbar from '../components/Searchbar';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '444947491391-9t7o8o77oj7tqdkior1hpq1irekt9270.apps.googleusercontent.com',
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loading ? (
          <Stack.Screen
            name="Splash"
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
            <Stack.Screen
              name="searchBar"
              component={Searchbar}
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
            <Stack.Screen
              name="forget"
              component={ForgetPassword}
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

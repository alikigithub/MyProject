import {
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {styles} from './AuthStyle';
import IMAGES from '../../../Assets/images';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../../cutomHooks/useRedux';
import {signInWithGoogle} from '../../redux/slice/userSlice';

type AuthScreenProps = NativeStackScreenProps<{
  SignUp: undefined;
  login: undefined;
}>;

function AuthScreen({navigation}: AuthScreenProps) {
  const dispatch = useAppDispatch();
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={IMAGES.BackgroundImg}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.viewDiv}>
          <Text style={styles.heading}>Connect friends easily & quickly</Text>
          <Text style={styles.para}>
            Our chat app is the perfect way to stay connected with friends and
            family.
          </Text>
          <View style={styles.logoDiv}>
            <TouchableOpacity onPress={() => dispatch(signInWithGoogle())}>
              <Image source={IMAGES.GoogleImg} style={styles.googleBtn} />
            </TouchableOpacity>
            <View style={styles.beforeText} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.afterText} />
            <TouchableHighlight
              style={styles.signUpBtn}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.btnTxt}>Sign up with mail</Text>
            </TouchableHighlight>
            <Text
              style={styles.login}
              onPress={() => navigation.navigate('login')}>
              Existing account? <Text style={styles.loginLink}>Log in</Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default AuthScreen;

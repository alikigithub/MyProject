import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import IMAGES from '../../Assets/images';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../cutomHooks/useRedux';
import {signInWithGoogle} from '../redux/store/slice/authSlice';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  viewDiv: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 24,
  },
  heading: {
    fontSize: 68,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 1.2 * 68, // Adjust for readability
  },
  para: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 39,
  },
  logoDiv: {
    flex: 1,
    alignItems: 'center',
    marginTop: 39,
    position: 'relative',
  },
  orText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '900',
    marginTop: 30,
  },
  beforeText: {
    width: 122,
    height: 1,
    backgroundColor: 'rgba(241, 232, 232, 0.16)',
    position: 'absolute',
    top: '27%',
    left: '3%',
  },
  afterText: {
    width: 122,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    position: 'absolute',
    top: '27%',
    right: '3%',
  },
  googleBtn: {
    width: 60,
    height: 60,
  },
  signUpBtn: {
    marginTop: 39,
    width: 327,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.37)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
  login: {
    marginTop: 39,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;

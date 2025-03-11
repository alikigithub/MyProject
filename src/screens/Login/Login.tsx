import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IMAGES from '../../../Assets/images';
import {loginUser, signInWithGoogle} from '../../redux/slice/userSlice';
import useLoginValidation from '../../cutomHooks/useLoginValidation';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../cutomHooks/useRedux';
import {styles} from './LoginStyle';
type RootStackParamList = {
  Login: undefined;
  forget: undefined;
};

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LoginProps) {
  const {
    email,
    setemail,
    password,
    setpassword,
    emailError,
    passworError,
    validinput,
  } = useLoginValidation();
  const dispatch = useAppDispatch();
  const loginBtn = () => {
    if (validinput()) {
      dispatch(loginUser({email, password}));
    }
  };
  const loginerror = useAppSelector(state => state.authSlice.loginError);
  if (loginerror.trim() !== '') {
    Alert.alert('Email Does not Exists');
  }

  return (
    <ScrollView>
      <View style={styles.loginContainer}>
        <View style={styles.chatbox}>
          <Text style={styles.chatboxText}>Log in to Chatbox</Text>
          <Text style={styles.chatboxPara}>
            Welcome back! Sign in using your social account or email to continue
            us
          </Text>
        </View>

        <View style={styles.googleDiv}>
          <TouchableOpacity onPress={() => dispatch(signInWithGoogle())}>
            <Image source={IMAGES.logoGoogle} style={styles.googleLogo} />
          </TouchableOpacity>
        </View>
        <View style={styles.ordiv}>
          <View style={styles.beforeText} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.afterText} />
        </View>

        <View style={styles.form}>
          <Text style={styles.lablemail}>Your email</Text>
          <TextInput
            placeholder="Enter Your Email"
            keyboardType="email-address"
            autoComplete="email"
            style={styles.inputField}
            value={email}
            onChangeText={setemail}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          <Text style={styles.lablePass}>Password</Text>
          <TextInput
            placeholder="Enter Your Password"
            autoComplete="password"
            keyboardType="default"
            secureTextEntry={true}
            style={styles.inputField}
            value={password}
            onChangeText={setpassword}
          />
          {passworError ? (
            <Text style={styles.error}>{passworError}</Text>
          ) : null}
        </View>
        <View style={styles.loginBgParent}>
          <ImageBackground style={styles.loginBg} source={IMAGES.BackgroundImg}>
            <TouchableOpacity style={styles.loginBtn} onPress={loginBtn}>
              <Text style={styles.btnClr}>Login</Text>
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity
            style={styles.forgetPassDiv}
            onPress={() => navigation.navigate('forget')}>
            <Text style={styles.forgetTx}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default Login;

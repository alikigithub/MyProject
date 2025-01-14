import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IMAGES from '../../Assets/images';

function Login() {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.chatbox}>
        <Text style={styles.chatboxText}>Log in to Chatbox</Text>
        <Text style={styles.chatboxPara}>
          Welcome back! Sign in using your social account or email to continue
          us
        </Text>
      </View>
      <View style={styles.googleDiv}>
        <TouchableOpacity>
          <Image source={IMAGES.logoGoogle} style={styles.googleLogo} />
        </TouchableOpacity>
        <View style={styles.beforeText}> </View>
        <Text style={styles.orText}>OR</Text>
        <View style={styles.afterText}> </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.lablemail}>Your email</Text>
        <TextInput
          placeholder="Enter Your Email"
          keyboardType="email-address"
          autoComplete="email"
          style={styles.inputField}
        />
        <Text style={styles.lablePass}>Password</Text>
        <TextInput
          placeholder="Enter Your Password"
          autoComplete="password"
          keyboardType="default"
          secureTextEntry={true}
          style={styles.inputField}
        />
      </View>
      <View>
        <ImageBackground style={styles.loginBg} source={IMAGES.BackgroundImg}>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.btnClr}>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.forgetPassDiv}>
        <Text style={styles.forgetTx}>Forgot password?</Text>
      </View>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  forgetPassDiv: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  forgetTx: {
    color: 'rgba(61, 74, 122, 1)',
    fontWeight: '500',
  },
  loginBg: {
    width: '100%',
    height: 48,
    borderRadius: 15,
    overflow: 'hidden',
  },

  loginBtn: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClr: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
  form: {
    width: '100%',
    height: '38%',

    marginTop: '2%',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(205, 209, 208, 1)',
  },
  inputLable: {
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(61, 74, 122, 1)',
  },
  lablemail: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 500,
    color: '    rgba(61, 74, 122, 1)',
  },
  lablePass: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(61, 74, 122, 1)',
  },
  googleDiv: {
    height: '20%',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  afterText: {
    width: 122,
    height: 1,
    backgroundColor: 'rgba(205, 209, 208, 1)',
    position: 'absolute',
    top: '78%',
    right: '3%',
  },
  beforeText: {
    width: 122,
    height: 1,
    backgroundColor: 'rgba(205, 209, 208, 1)',
    position: 'absolute',
    top: '78%',
    left: '3%',
  },
  orText: {
    fontSize: 14,
    color: '#rgba(121, 124, 123, 1)',
    fontWeight: 900,
    marginTop: 30,
  },
  googleLogo: {
    width: 58,
    height: 58,
  },
  chatbox: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    marginTop: 90,
  },
  chatboxPara: {
    fontSize: 18,
    color: 'rgba(121, 124, 123, 1)',
    textAlign: 'center',
    marginTop: 15,
  },
  chatboxText: {
    fontSize: 28,
    fontWeight: 700,
    color: 'rgba(61, 74, 122, 1)',
  },
  loginContainer: {
    position: 'relative',
    padding: 24,
    flex: 1,
  },
  backImg: {
    width: 24,
    height: 24,
  },
});

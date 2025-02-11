import React from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import IMAGES from '../../Assets/images';
import {signUpUser} from '../redux/store/slice/authSlice';
import {useAppDispatch} from '../cutomHooks/useRedux';
import useSignUpValidation from '../cutomHooks/useSignUpValidaton';

function SignUP() {
  const dispatch = useAppDispatch();
  const {
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    userNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    validateInputs,
  } = useSignUpValidation();

  const signUpData = async () => {
    if (validateInputs()) {
      dispatch(
        signUpUser({
          username: userName,
          email,
          password,
        }),
      );
    } else {
      Alert.alert('Please fix the errors before proceeding.');
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView style={styles.loginContainer}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            <View style={styles.chatbox}>
              <Text style={styles.chatboxText}>Sign up with Email</Text>
              <Text style={styles.chatboxPara}>
                Get chatting with friends and family today by signing up for our
                chat app!
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Your Name</Text>
              <TextInput
                placeholder="Enter Your Name"
                keyboardType="default"
                autoComplete="name"
                style={styles.inputField}
                value={userName}
                onChangeText={setUserName}
              />
              {userNameError ? (
                <Text style={styles.error}>{userNameError}</Text>
              ) : null}

              <Text style={styles.label}>Your Email</Text>
              <TextInput
                placeholder="Enter Your Email"
                keyboardType="email-address"
                autoComplete="email"
                style={styles.inputField}
                value={email}
                onChangeText={setEmail}
              />
              {emailError ? (
                <Text style={styles.error}>{emailError}</Text>
              ) : null}

              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter Your Password"
                autoComplete="password"
                keyboardType="default"
                secureTextEntry={true}
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
              />
              {passwordError ? (
                <Text style={styles.error}>{passwordError}</Text>
              ) : null}

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                placeholder="Confirm Password"
                autoComplete="password"
                keyboardType="default"
                secureTextEntry={true}
                style={styles.inputField}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {confirmPasswordError ? (
                <Text style={styles.error}>{confirmPasswordError}</Text>
              ) : null}
            </View>

            <View style={styles.loginBtnView}>
              <ImageBackground
                style={styles.loginBg}
                source={IMAGES.BackgroundImg}>
                <TouchableOpacity style={styles.loginBtn} onPress={signUpData}>
                  <Text style={styles.btnClr}>Create an account</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default SignUP;

const styles = StyleSheet.create({
  loginBtnView: {
    height: 200,
    justifyContent: 'flex-end',
  },

  loginContainer: {
    padding: 24,
    flex: 1,
  },
  chatbox: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatboxText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'rgba(61, 74, 122, 1)',
  },
  chatboxPara: {
    fontSize: 18,
    color: 'rgba(121, 124, 123, 1)',
    textAlign: 'center',
    paddingTop: 15,
  },
  form: {
    marginTop: '10%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(61, 74, 122, 1)',
    marginTop: 10,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(205, 209, 208, 1)',
    paddingVertical: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  loginBg: {
    width: '100%',
    height: 48,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  loginBtn: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClr: {
    color: 'white',
    fontSize: 16,
  },
});

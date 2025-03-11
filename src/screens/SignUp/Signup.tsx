import React from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import IMAGES from '../../../Assets/images';
import {signUpUser} from '../../redux/slice/userSlice';
import {useAppDispatch} from '../../cutomHooks/useRedux';
import useSignUpValidation from '../../cutomHooks/useSignUpValidaton';
import {styles} from './SignUpStyle';
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
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignUP;

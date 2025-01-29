import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import IMAGES from '../../Assets/images';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../redux/store/slice/authSlice';

function SignUP() {
  const [userName, setUserName] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const [passwordVlu, setpasswordVlu] = useState<string>('');
  const [confrimpasswordVlu, setconfirmpasswordVlu] = useState<string>('');
  const dispatch = useDispatch();
  const signUpdata = async () => {
    if (passwordVlu === confrimpasswordVlu) {
      console.log(email, userName, passwordVlu);
      console.log();
      dispatch(
        signUpUser({
          username: userName,
          email,
          password: passwordVlu,
        }),
      );
    } else {
      Alert.alert('Passwords Must be Same');
    }
  };

  return (
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
            <Text style={styles.lablename}>Your Name</Text>
            <TextInput
              placeholder="Enter Your Name"
              keyboardType="default"
              autoComplete="name"
              style={styles.inputField}
              value={userName}
              onChangeText={setUserName}
            />
            <Text style={styles.lablemail}>Your email</Text>
            <TextInput
              placeholder="Enter Your Email"
              keyboardType="email-address"
              autoComplete="email"
              style={styles.inputField}
              value={email}
              onChangeText={setemail}
            />
            <Text style={styles.lablePass}>Password</Text>
            <TextInput
              placeholder="Enter Your Password"
              autoComplete="password"
              keyboardType="default"
              secureTextEntry={true}
              style={styles.inputField}
              value={passwordVlu}
              onChangeText={setpasswordVlu}
            />
            <Text style={styles.lablePass}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              autoComplete="password"
              keyboardType="default"
              secureTextEntry={true}
              style={styles.inputField}
              value={confrimpasswordVlu}
              onChangeText={setconfirmpasswordVlu}
            />
          </View>
          <View>
            <ImageBackground
              style={styles.loginBg}
              source={IMAGES.BackgroundImg}>
              <TouchableOpacity style={styles.loginBtn} onPress={signUpdata}>
                <Text style={styles.btnClr}>Create an account</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
export default SignUP;

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
    height: '67%',
    marginTop: '13%',
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
  lablename: {
    fontSize: 14,
    fontWeight: 500,
    color: '    rgba(61, 74, 122, 1)',
  },
  lablemail: {
    marginTop: 10,
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

  chatbox: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatboxPara: {
    fontSize: 18,
    color: 'rgba(121, 124, 123, 1)',
    textAlign: 'center',
    paddingTop: 15,
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

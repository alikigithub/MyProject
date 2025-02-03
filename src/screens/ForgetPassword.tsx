import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ButtonTemp from '../components/button';
import {forgetPassword} from '../redux/store/slice/authSlice';
import Loader from '../components/Loader';

function ForgetPassword() {
  const [email, setemail] = useState<string>('');
  const [loader, setloader] = useState<boolean>(false);
  const dispatch = useDispatch();
  const Recover = async () => {
    if (email.trim() === '') {
      Alert.alert('Enter Email pleae');
      setemail('');
      return;
    }
    try {
      setloader(true);
      console.log(email);
      await dispatch(forgetPassword({email}));
    } catch (error) {
      console.log(error);
    } finally {
      setloader(false);
      setemail('');
    }
  };
  useState();
  return loader ? (
    <Loader />
  ) : (
    <View style={styles.loginContainer}>
      <View style={styles.chatbox}>
        <Text style={styles.chatboxText}>Forget Password</Text>
        <Text style={styles.chatboxPara}>
          Forgot your password? Don’t worry, we’ll send you a magic link right
          at your inbox!
        </Text>
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
        <ButtonTemp titleName="Recover Password" onpress={Recover} />
      </View>
    </View>
  );
}
export default ForgetPassword;

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

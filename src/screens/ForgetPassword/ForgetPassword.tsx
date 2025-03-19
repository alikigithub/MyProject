import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Loader from '../../components/loader/loader';
import {ScrollView} from 'react-native-gesture-handler';
import ButtonTem from '../../components/buttonTem/buttonTem';
import {styles} from './ForgetPasswordStyle';
import useForgetPassword from '../../cutomHooks/useForgetPassword';
function ForgetPassword() {
  const {email, setEmail, loader, recover} = useForgetPassword();

  return loader ? (
    <Loader />
  ) : (
    <ScrollView>
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
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.forgetPassDiv}>
          <ButtonTem
            buttonType="default"
            onPress={recover}
            titleName="Recover Password"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default ForgetPassword;

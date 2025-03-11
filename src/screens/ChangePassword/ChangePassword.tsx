import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {styles} from './ChangePasswordStyle';
import IMAGES from '../../../Assets/images';
import Loader from '../../components/Loader/Loader';
import ButtonTem from '../../components/ButtonTem/ButtonTem';
import useChangePassword from '../../cutomHooks/useChangePassword';
export default function ChangePassword({navigation}: any) {
  const {
    password,
    newPassword,
    confirmPassword,
    loading,
    setPassword,
    setNewPassword,
    setConfirmPassword,
    updatePassword,
  } = useChangePassword();

  return (
    <ScrollView>
      <ImageBackground
        source={IMAGES.BackgroundImg}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.parentView}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backtick}
              onPress={() => navigation.navigate('setting')}>
              <Image source={IMAGES.backtickWhite} />
            </TouchableOpacity>
            <Text style={styles.headingTxt}>Change Password</Text>
          </View>
          {loading ? (
            <Loader />
          ) : (
            <View style={styles.homeMain}>
              <View style={styles.form}>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Current Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>New Password</Text>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
                <View style={styles.formField}>
                  <Text style={styles.formLabel}>Confirm Password</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.btnView}>
                <ButtonTem
                  buttonType="default"
                  titleName="Update Password"
                  onPress={updatePassword}
                />
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

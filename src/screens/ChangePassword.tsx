import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import IMAGES from '../../Assets/images';
import ButtonTemp from '../components/Button';
import Loader from '../components/Loader';
import {changePasswordSlice} from '../redux/store/slice/authSlice';
import {useAppDispatch} from '../cutomHooks/useRedux';

const {height} = Dimensions.get('window');
const adjheight = height - 50;

export default function Profile({navigation}: any) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const UpdatePassword = async () => {
    if (!password || !newPassword || !confirmPassword) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }
    if (newPassword !== confirmPassword) {
      return Alert.alert(
        'Error',
        'New password and confirmation do not match.',
      );
    }

    try {
      setLoading(true);
      await dispatch(
        changePasswordSlice({
          currentPassword: password,
          newPassword: confirmPassword,
        }),
      );
      Alert.alert('Success', 'Password updated successfully!');
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                <ButtonTemp
                  titleName="Update Password"
                  onpress={UpdatePassword}
                />
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btnView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  formLabel: {
    color: '#3D4A7A',
    fontSize: 16,
  },
  formField: {
    marginBottom: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDD1D0',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
  form: {
    marginTop: 45,
    width: '90%',
    height: '60%',
    alignItems: 'center',
  },
  backtick: {
    flexGrow: 0.5,
  },
  parentView: {
    alignItems: 'center',
    height: adjheight,
  },
  background: {
    flex: 1,
  },
  topBar: {
    height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  homeMain: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

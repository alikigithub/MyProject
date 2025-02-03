import React, {useState} from 'react';
import IMAGES from '../../Assets/images';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import ButtonTemp from '../components/button';
import Loader from '../components/Loader';
import {changePasswordSlice} from '../redux/store/slice/authSlice';
export default function Profile({navigation}) {
  const [password, setpassword] = useState<string>('');
  const [newpassword, setNewpassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const UpdatePassword = async () => {
    if (newpassword !== confirmPassword) {
      Alert.alert('Both Passwords Are Not Same');
    } else {
      try {
        setloading(true);
        if (password?.trim() === '' && newpassword?.trim() === '') {
          Alert.alert('Please Complete the Relevent Field');
        } else {
          await dispatch(
            changePasswordSlice({
              currentPassword: password,
              newPassword: confirmPassword,
            }),
          );
        }
      } catch (error) {
        Alert.alert(error);
        console.log(error);
      } finally {
        setloading(false);
        setpassword('');
        setconfirmPassword('');
        setNewpassword('');
      }
    }
  };

  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <View style={styles.backtick}>
            <TouchableOpacity onPress={() => navigation.navigate('setting')}>
              <Image source={IMAGES.backtickWhite} />
            </TouchableOpacity>
          </View>
          <Text style={styles.headingTxt}>Change Password</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.homeMain}>
            <View style={styles.form}>
              <View style={styles.formUserName}>
                <Text style={styles.formLables}>Current Password</Text>
                <TextInput value={password} onChangeText={setpassword} />
              </View>
              <View style={styles.formUserName}>
                <Text style={styles.formLables}>New Password</Text>
                <TextInput value={newpassword} onChangeText={setNewpassword} />
              </View>
              <View style={styles.formUserName}>
                <Text style={styles.formLables}>Confirm Password</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setconfirmPassword}
                />
              </View>
            </View>

            <ButtonTemp titleName="Update Profile" onpress={UpdatePassword} />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  formLables: {
    color: '#3D4A7A',
    fontSize: 16,
  },
  formUserName: {
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD1D0',
    justifyContent: 'center',
  },
  form: {width: '90%', height: '60%', alignItems: 'center'},
  editView: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
  edit: {
    height: 12,
    width: 12,
  },

  imgStyle: {
    marginTop: 10,
    height: 80,
    width: 80,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  btn: {
    width: '100%',
    height: 90,
    borderWidth: 1,
  },
  profilePic: {height: '100%', width: '100%'},

  backtick: {
    flexGrow: 0.5,
  },
  parentView: {
    flex: 1,
    alignItems: 'center',
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
    fontSize: 20,
    color: 'white',
  },
  searchText: {
    color: 'white',
    fontSize: 16,
  },
  homeMain: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
  },
});

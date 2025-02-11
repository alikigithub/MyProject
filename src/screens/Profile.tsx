import React, {useEffect, useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {
  sendprofilePic,
  sendstatus,
  sendUserNmae,
} from '../redux/store/slice/authSlice';
import ButtonTemp from '../components/Button';
import Loader from '../components/Loader';
import {useAppDispatch, useAppSelector} from '../cutomHooks/useRedux';
export default function Profile({navigation}: any) {
  const status: string = useAppSelector(state => state.authSlice.status);
  const profilePic: string = useAppSelector(
    state => state.authSlice.profilePic,
  );
  const email: string = useAppSelector(state => state.authSlice.email);
  const userName: string = useAppSelector(state => state.authSlice.username);

  const [userNameData, setUserName] = useState<string>('');
  const [statusData, setStatusData] = useState<string>('');
  const [profile, setprofile] = useState<string>('');
  const [loading, setloading] = useState<boolean>(false);
  const currentID: string = auth().currentUser?.uid || '';
  const dispatch = useAppDispatch();
  useEffect(() => {
    setprofile(profilePic);
    setUserName(userName);
    setStatusData(status);
  }, [profilePic, userName, status]);
  const openGallary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0,
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('User canceled video picker');
        } else if (response.errorCode) {
          Alert.alert('Error: ', response.errorCode);
        } else {
          if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].base64;
            const base64 = `data:image/jpeg;base64,${uri}`;
            setprofile(base64);
          }
        }
      },
    );
  };
  const UpdateProfile = async () => {
    try {
      await dispatch(sendprofilePic({userId: currentID, ProfileUrl: profile}));

      if (statusData?.trim() !== '') {
        await dispatch(
          sendstatus({userId: currentID, updatedStatus: statusData}),
        );
      }

      if (userNameData.trim() !== '') {
        await dispatch(
          sendUserNmae({userId: currentID, UpdateUserName: userNameData}),
        );
      }

      Alert.alert('Profile updated successfully!');
    } catch (error) {
      Alert.alert('Complete the Update Process');
    } finally {
      setloading(false);
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
          <Text style={styles.headingTxt}>Profile</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.homeMain}>
            <TouchableOpacity onPress={openGallary}>
              <View style={styles.imgStyle}>
                {loading ? (
                  <ActivityIndicator size="large" color="blue" />
                ) : (
                  <Image
                    source={
                      profile?.trim() !== ''
                        ? {uri: profile}
                        : IMAGES.profileIcon
                    }
                    style={styles.profilePic}
                  />
                )}
              </View>
              <View style={styles.editView}>
                <Image source={IMAGES.edit} style={styles.edit} />
              </View>
            </TouchableOpacity>
            <View style={styles.form}>
              <View style={styles.formUserName}>
                <Text style={styles.formLables}>Your name</Text>
                <TextInput
                  defaultValue={userName}
                  value={userNameData}
                  onChangeText={setUserName}
                />
              </View>
              <View style={styles.formUserName}>
                <Text style={styles.formLables}>Your email</Text>
                <TextInput defaultValue={email} value={email} readOnly />
              </View>
              <View style={styles.formUserName}>
                <Text style={styles.formLables}>Your status</Text>
                <TextInput
                  defaultValue={status}
                  value={statusData}
                  onChangeText={setStatusData}
                />
              </View>
            </View>

            <ButtonTemp titleName="Update Profile" onpress={UpdateProfile} />
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
    fontSize: 22,
    fontWeight: 'bold',
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

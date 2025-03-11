import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import {
  sendprofilePic,
  sendstatus,
  sendUserNmae,
} from '../redux/slice/userSlice';
import {useAppDispatch, useAppSelector} from '../cutomHooks/useRedux';

const useProfile = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userSlice.status);
  const profilePic = useAppSelector(state => state.userSlice.profilePic);
  const email = useAppSelector(state => state.userSlice.email);
  const userName = useAppSelector(state => state.userSlice.username);

  const [userNameData, setUserName] = useState<string>('');
  const [statusData, setStatusData] = useState<string>('');
  const [profile, setProfile] = useState<string>('');
  const currentID: string = auth().currentUser?.uid || '';

  useEffect(() => {
    setProfile(profilePic);
    setUserName(userName);
    setStatusData(status);
  }, [profilePic, userName, status]);

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        quality: 0,
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('User canceled image selection');
        } else if (response.errorCode) {
          Alert.alert('Error: ', response.errorCode);
        } else {
          if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].base64;
            const base64 = `data:image/jpeg;base64,${uri}`;
            setProfile(base64);
          }
        }
      },
    );
  };

  const updateProfile = async () => {
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
    }
  };

  return {
    profile,
    userNameData,
    statusData,
    email,
    setUserName,
    setStatusData,
    openGallery,
    updateProfile,
  };
};

export default useProfile;

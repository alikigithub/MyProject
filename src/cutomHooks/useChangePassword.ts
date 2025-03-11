import {useState} from 'react';
import {Alert} from 'react-native';
import {useAppDispatch} from '../cutomHooks/useRedux';
import {changePasswordSlice} from '../redux/slice/userSlice';

const useChangePassword = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const updatePassword = async () => {
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

  return {
    password,
    newPassword,
    confirmPassword,
    loading,
    setPassword,
    setNewPassword,
    setConfirmPassword,
    updatePassword,
  };
};

export default useChangePassword;

import {useState} from 'react';
import {Alert} from 'react-native';
import {useAppDispatch} from '../cutomHooks/useRedux';
import {forgetPassword} from '../redux/slice/userSlice';

const useForgetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const recover = async () => {
    if (email.trim() === '') {
      Alert.alert('Enter Email please');
      setEmail('');
      return;
    }
    try {
      setLoader(true);
      await dispatch(forgetPassword(email));
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
      setEmail('');
    }
  };

  return {
    email,
    setEmail,
    loader,
    recover,
  };
};

export default useForgetPassword;

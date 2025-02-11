import {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {resetState} from '../redux/store/slice/authSlice';
import {useAppDispatch} from '../cutomHooks/useRedux';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const signOut = useCallback(async () => {
    try {
      dispatch(resetState());
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [dispatch]);

  return {signOut};
};

export default useLogout;

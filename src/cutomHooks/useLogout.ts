import {useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import {resetState} from '../redux/slice/userSlice';
import {useAppDispatch} from '../cutomHooks/useRedux';
import {resetStateAll} from '../redux/slice/chatSlice';

const useLogout = () => {
  const dispatch = useAppDispatch();

  const signOut = useCallback(async () => {
    try {
      dispatch(resetState());
      dispatch(resetStateAll());
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [dispatch]);

  return {signOut};
};

export default useLogout;

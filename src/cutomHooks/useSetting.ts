import {useAppSelector} from '../cutomHooks/useRedux';
import useLogout from '../cutomHooks/useLogout';

const useSetting = () => {
  const userName: string = useAppSelector(state => state.userSlice.username);
  const profile: string = useAppSelector(state => state.userSlice.profilePic);
  const status: string = useAppSelector(state => state.userSlice.status);
  const homedataofUsers1 = useAppSelector(
    state => state.userSlice.homedataofUsers,
  );
  const {signOut} = useLogout();

  return {
    userName,
    profile,
    status,
    signOut,
  };
};

export default useSetting;

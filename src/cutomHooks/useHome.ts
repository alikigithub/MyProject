import {useEffect, useMemo, useRef, useState, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../cutomHooks/useRedux';
import {
  currentUserUpdate,
  getHomeUsers,
  search,
} from '../redux/slice/userSlice';
import {chatUsers} from '../redux/slice/chatSlice';

const useHome = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.userSlice.profilePic);
  const listOfUsers = useAppSelector(state => state.userSlice.homedataofUsers);
  const memoListOfUsers = useMemo(() => listOfUsers, [listOfUsers]);
  const checkingValue = useRef(true);
  const [loading, setLoading] = useState(false);

  const parallelDispatch = useCallback(async () => {
    try {
      await Promise.all([
        dispatch(currentUserUpdate()),
        dispatch(getHomeUsers()).then(() => setLoading(false)),
        dispatch(chatUsers()),
        dispatch(search()),
      ]);
    } finally {
      setLoading(false);
      checkingValue.current = false;
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(!checkingValue.current);
      try {
        await parallelDispatch();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, parallelDispatch]);

  return {
    profile,
    memoListOfUsers,
    loading,
  };
};

export default useHome;

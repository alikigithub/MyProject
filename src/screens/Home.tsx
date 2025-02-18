import React, {
  useLayoutEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
} from 'react';
import IMAGES from '../../Assets/images';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ChatUsers from '../components/ChatUser';
import {Text} from '@react-navigation/elements';
import {
  chatUsers,
  currentUserUpdate,
  getHomeUsers,
  search,
} from '../redux/store/slice/authSlice';
import {useAppDispatch, useAppSelector} from '../cutomHooks/useRedux';
import SmallLoader from '../components/SmallLoader';

export default function Home({navigation}: any) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.authSlice.profilePic);
  const listofUsers = useAppSelector(state => state.authSlice.homedataofUsers);
  const memolistofusers = useMemo(() => listofUsers, [listofUsers]);
  const checkingvalue = useRef(true);
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
      checkingvalue.current = false;
    }
  }, []);

  useLayoutEffect(() => {
    const fetchData = async () => {
      setLoading(!checkingvalue.current);
      try {
        await parallelDispatch();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, parallelDispatch]);

  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('searchBar')}>
            <View style={styles.iconContainer}>
              <Image source={IMAGES.searchIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>

          <Text style={styles.heading}>Home</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingNavigation')}
            style={
              profile?.trim() !== ''
                ? styles.imgStyle
                : styles.profilePicContainer
            }>
            <Image
              source={
                profile?.trim() !== '' ? {uri: profile} : IMAGES.profileIcon
              }
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.homeMain}>
          <View style={styles.subHome}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <SmallLoader />
              </View>
            ) : (
              <FlatList
                data={memolistofusers}
                renderItem={item => (
                  <ChatUsers items={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false} // Hide vertical scrollbar
                showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
                ListEmptyComponent={
                  <View style={styles.emptyText}>
                    <Text style={styles.emptyText1}>
                      Sorry, there is no Data
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profiledefault: {height: 60, width: 60},
  imgStyle: {
    marginTop: 10,
    height: 40,
    width: 40,
    borderRadius: 50,
    overflow: 'hidden',
  },
  subHome: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  homeMain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
  },
  parentView: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    left: '50%',
    height: 100,
    bottom: -150,
    transform: [{translateX: -25}, {translateY: -25}],
  },
  logout: {
    height: 20,
    width: 20,
    backgroundColor: 'green',
    borderWidth: 1,
  },
  logtxt: {
    color: 'pink',
  },
  topBar: {
    height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  profilePicContainer: {
    marginTop: 10,
    height: 55,
    width: 55,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profilePic: {
    height: '100%',
    width: '100%',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  emptyText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  emptyText1: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

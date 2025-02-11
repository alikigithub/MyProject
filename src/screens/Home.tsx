import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
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
import {chatUsers, getHomeUsers, search} from '../redux/store/slice/authSlice';
import {useAppDispatch, useAppSelector} from '../cutomHooks/useRedux';

export default function Home({navigation}: any) {
  const currentUser = auth().currentUser?.uid;
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.authSlice.profilePic);
  const listofUsers = useAppSelector(state => state.authSlice.homedataofUsers);

  useEffect(() => {
    dispatch(search());
    dispatch(chatUsers());
    dispatch(getHomeUsers());
  }, [currentUser, dispatch]);
  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.backgorund}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('searchBar')}>
            <View style={styles.icoNiMG}>
              <Image source={IMAGES.searchIcon} />
            </View>
          </TouchableOpacity>

          <Text style={styles.headingTxt}>Home</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingNavigation')}
            style={
              profile?.trim() !== '' ? styles.imgStyle : styles.profilePic
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
            <FlatList
              data={listofUsers}
              renderItem={item => (
                <ChatUsers items={item} navigation={navigation} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
  backgorund: {
    flex: 1,
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
  icoNiMG: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 44,
    width: 44,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  profilePic: {height: 55, width: 55},
});

import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import IMAGES from '../../Assets/images';
import Searchbar from '../components/searchbar';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {chatUsers, resetState} from '../redux/store/slice/authSlice';
import ChatUsers from '../components/ChatUser';
import {Text} from '@react-navigation/elements';
import Loader from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';

export default function Home({navigation}) {
  const [search, setsearch] = useState<Boolean>(false);
  const currentUser = auth().currentUser;
  const dispatch = useDispatch();
  const listofUsers = useSelector(state => state.authSlice.addUsers);
  const loading = useSelector(state => state.authSlice.loading);

  console.log(listofUsers);
  console.log(loading);
  useFocusEffect(
    React.useCallback(() => {
      if (currentUser) {
        dispatch(chatUsers(currentUser?.uid));
      }
    }, [dispatch, currentUser?.uid]),
  );
  if (search) {
    return <Searchbar setsearch={setsearch} />;
  }
  const signOut = async () => {
    dispatch(resetState());
    await auth()
      .signOut()
      .catch(error => console.error('Error signing out:', error));
  };

  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.backgorund}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setsearch(true)}>
            <View style={styles.icoNiMG}>
              <Image source={IMAGES.searchIcon} />
            </View>
          </TouchableOpacity>

          <Text style={styles.headingTxt}>Home</Text>
          <Image style={styles.profilePic} source={IMAGES.profileIcon} />
        </View>
        {loading ? (
          <Loader />
        ) : (
          <View style={styles.homeMain}>
            <TouchableOpacity style={styles.logout} onPress={signOut}>
              <Text style={styles.logtxt}>LOG</Text>
            </TouchableOpacity>
            <View style={styles.subHome}>
              <FlatList
                data={listofUsers}
                renderItem={item => (
                  <ChatUsers items={item} navigation={navigation} />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  subHome: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeMain: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    borderWidth: 1,
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
    fontSize: 20,
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 1)',
  },
  profilePic: {height: 55, width: 55},
});

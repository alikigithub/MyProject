import React from 'react';
import {Text} from '@react-navigation/elements';
import IMAGES from '../../Assets/images';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {chatuser} from '../types/type';
import auth from '@react-native-firebase/auth';
import {homeUsers} from '../redux/store/slice/authSlice';
import {NavigationProp} from '@react-navigation/native';
import {useAppDispatch} from '../cutomHooks/useRedux';

interface ChatUsersContactsProps {
  items: {
    item: {
      id: string;
      profilePic: string;
      UserName: string;
    };
  };
  navigation: NavigationProp<any>;
}

export default function ChatUsersContacts({
  items,
  navigation,
}: ChatUsersContactsProps) {
  const dispatch = useAppDispatch();

  const openChat = () => {
    const currentId = auth().currentUser?.uid;
    if (!currentId) {
      return;
    }

    const otherUserID = items.item.id;
    const chatId = [currentId, otherUserID].sort().join();
    const user: chatuser = {
      chatId,
      profile: items.item.profilePic,
      otherUserID,
      otherUserName: items.item.UserName,
    };
    dispatch(homeUsers(otherUserID));
    navigation.navigate('Chat', {user});
  };

  return (
    <TouchableOpacity onPress={openChat} style={styles.subhome}>
      <View
        style={items.item.profilePic.trim() ? styles.imgStyle : styles.imgDiv}>
        <Image
          style={styles.profilePic}
          source={
            items.item.profilePic.trim()
              ? {uri: items.item.profilePic}
              : IMAGES.profileIcon
          }
        />
      </View>
      <View style={styles.chatData}>
        <Text style={styles.userName}>{items.item.UserName}</Text>
        <Text>Have a good day</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imgStyle: {
    marginTop: 10,
    height: 55,
    width: 55,
    borderRadius: 50,
    overflow: 'hidden',
  },
  subhome: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
  },
  chatData: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgDiv: {
    position: 'relative',
    width: 48,
  },
  profilePic: {
    height: 55,
    width: 55,
  },
});

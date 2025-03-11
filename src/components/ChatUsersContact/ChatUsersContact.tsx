import React from 'react';
import {Text} from '@react-navigation/elements';
import IMAGES from '../../../Assets/images';
import {Image, TouchableOpacity, View} from 'react-native';
import {chatuser, ChatUsersContactsProps} from '../../types/type';
import auth from '@react-native-firebase/auth';
import {homeUsers} from '../../redux/slice/chatSlice';
import {useAppDispatch} from '../../cutomHooks/useRedux';
import {styles} from './ChatUsersContactStyle';

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
      profile: items?.item?.profile,
      otherUserID,
      otherUserName: items?.item.UserName,
    };
    dispatch(homeUsers(otherUserID));
    navigation.navigate('Chat', {user});
  };

  return (
    <TouchableOpacity onPress={openChat} style={styles.subhome}>
      <View
        style={items?.item?.profile?.trim() ? styles.imgStyle : styles.imgDiv}>
        <Image
          style={styles.profilePic}
          source={
            items?.item?.profile?.trim() === ''
              ? IMAGES.profileIcon
              : {uri: items?.item?.profile}
          }
        />
      </View>
      <View style={styles.chatData}>
        <Text style={styles.userName}>{items?.item?.UserName}</Text>
        <Text>Have a good day</Text>
      </View>
    </TouchableOpacity>
  );
}

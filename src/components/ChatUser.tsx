import {Text} from '@react-navigation/elements';
import React from 'react';
import IMAGES from '../../Assets/images';

import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {chatuser} from '../types/type';
import auth from '@react-native-firebase/auth';

export default function ChatUsers({items, navigation}) {
  // console.log(items.item.profilePic);

  const openChat = () => {
    const currentId = auth().currentUser?.uid;
    const otherUserID = items.item.id;
    const combineid = [currentId, otherUserID].sort().join();
    const user: chatuser = {
      chatId: combineid,
      profile: items.item.profilePic,
      otherUserID,
      otherUserName: items.item.UserName,
    };
    navigation.navigate('Chat', {user});
  };
  return (
    <TouchableOpacity onPress={openChat}>
      <View style={styles.subhome}>
        <View
          style={
            items.item?.profilePic.trim() === ''
              ? styles.imgDiv
              : styles.imgStyle
          }>
          <Image
            style={styles.profilePic}
            source={
              items.item?.profilePic.trim() === ''
                ? IMAGES.profileIcon
                : {uri: items.item?.profilePic}
            }
          />
        </View>
        <View style={styles.chatData}>
          <Text style={styles.userName}>{items.item?.UserName}</Text>
          <Text>Have a good Day</Text>
        </View>
        {/* <View style={styles.time}>
        <Text style={styles.timedata}>2 min ago</Text>
      </View> */}
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
    width: '90%',
    marginTop: 32,
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
  },
  chatData: {
    justifyContent: 'center',
  },
  time: {
    justifyContent: 'center',
    position: 'absolute',
    right: 2,
  },
  timedata: {
    color: 'rgba(121, 124, 123, 0.5)',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgDiv: {
    position: 'relative',
    width: 48,
  },
  online: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'rgba(15, 225, 109, 1)',
    borderRadius: '50%',
    right: 0,
    bottom: 8,
  },

  profilePic: {height: 55, width: 55},
});

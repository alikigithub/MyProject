import React from 'react';
import {Text} from '@react-navigation/elements';
import IMAGES from '../../../Assets/images';
import {Image, TouchableOpacity, View} from 'react-native';
import {chatuser} from '../../types/type';
import auth from '@react-native-firebase/auth';
import {getHomeUsers} from '../../redux/slice/userSlice';
import {updateContactList} from '../../redux/slice/chatSlice';
import {Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch} from '../../cutomHooks/useRedux';
import {styles} from './ChatUserStyle';
export default function ChatUsers({items, navigation}: any) {
  const dispatch = useAppDispatch();

  const handleDelete = (deleteID: string) => {
    dispatch(updateContactList({deleteID}));
    dispatch(getHomeUsers());
  };

  const renderRightActions = (deleteID: string) => (
    <View style={styles.parentView}>
      <View style={styles.hiddenContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(deleteID)}>
          <Icon name="trash" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
    <Swipeable renderRightActions={() => renderRightActions(items.item.id)}>
      <TouchableOpacity onPress={openChat} style={styles.subhome}>
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
      </TouchableOpacity>
    </Swipeable>
  );
}

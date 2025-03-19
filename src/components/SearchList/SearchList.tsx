import React, {useEffect, useState} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import IMAGES from '../../../Assets/images';
import Button from '../buttonTem/buttonTem';
import {contact, search, searchUserUpdate} from '../../redux/slice/userSlice';
import {chatUsers} from '../../redux/slice/chatSlice';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../../cutomHooks/useRedux';
import {styles} from './searchListStyle';
interface User {
  item: {
    contact: string[];
    id: string;
    profilePic: string;
    UserName: string;
    status: string;
  };
}

interface SearchListProps {
  users: User;
}

function SearchList({users}: SearchListProps) {
  const dispatch = useAppDispatch();
  const [addfriend, setaddfriend] = useState<boolean>();
  const currentUser = auth().currentUser?.uid;
  const friendList = users.item.contact;
  const secondUser = users.item.id;

  useEffect(() => {
    if (friendList && currentUser) {
      setaddfriend(friendList.includes(currentUser));
    }
  }, [users, currentUser, friendList]);

  const addFriend = async () => {
    if (currentUser && secondUser) {
      try {
        setaddfriend(true);
        dispatch(searchUserUpdate(secondUser));
        await dispatch(
          contact({currentUserId: currentUser, otherUserID: secondUser}),
        ).unwrap();
        await dispatch(chatUsers()).unwrap();
        await dispatch(search()).unwrap();
      } catch (error) {
        setaddfriend(false);
      }
    }
  };

  const defaultStatus = 'be your own';

  return (
    <ScrollView>
      <View style={styles.searchProfiles}>
        <View style={styles.iconSprofile}>
          <View style={styles.imgDiv}>
            <Image
              source={
                users.item.profilePic.trim()
                  ? {uri: users.item.profilePic}
                  : IMAGES.profileIcon
              }
              style={styles.imgD}
            />
          </View>
          <View>
            <Text style={styles.heading}>{users.item.UserName}</Text>
            <Text style={styles.msg}>
              {users.item.status.trim() || defaultStatus}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsView}>
          {addfriend ? (
            <Text style={styles.friend}>Friends</Text>
          ) : (
            <Button
              buttonType="addUser"
              onPress={addFriend}
              titleName="Add Friend"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default SearchList;

import React, {useEffect, useState} from 'react';
import {Image, View, Text, StyleSheet, ScrollView} from 'react-native';
import IMAGES from '../../Assets/images';
import AddUserButton from './AddUserButton';
import {contact} from '../redux/store/slice/authSlice';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../cutomHooks/useRedux';

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
  const [addfriend, setaddfriend] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentUser = auth().currentUser;
  const friendList = users.item.contact;
  const secondUser = users.item.id;
  const defaultStatus = 'be your own';

  useEffect(() => {
    if (friendList && currentUser) {
      setaddfriend(friendList.includes(currentUser.uid));
    }
  }, [users, currentUser, friendList]);

  const addFriend = () => {
    if (currentUser && secondUser) {
      dispatch(
        contact({currentUserId: currentUser.uid, otherUserID: secondUser}),
      );
      setaddfriend(true);
    }
  };

  return (
    <ScrollView>
      <View style={styles.searchProfiles}>
        <View style={styles.iconSprofile}>
          <View style={styles.imgDiv}>
            <Image
              source={
                users.item.profilePic.trim() !== ''
                  ? {uri: users.item.profilePic}
                  : IMAGES.profileIcon
              }
              style={styles.imgD}
            />
          </View>
          <View>
            <Text style={styles.heading}>{users.item.UserName}</Text>
            <Text style={styles.msg}>
              {users.item.status.trim() !== ''
                ? users.item.status
                : defaultStatus}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsView}>
          {addfriend ? (
            <Text style={styles.friend}>Friends</Text>
          ) : (
            <AddUserButton onPress={addFriend} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default SearchList;

const styles = StyleSheet.create({
  friend: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsView: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSprofile: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    overflow: 'hidden',
  },
  searchProfiles: {
    width: '100%',
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
  },
  imgDiv: {
    height: 52,
    width: 52,
    overflow: 'hidden',
    borderRadius: 50,
  },
  imgD: {
    height: 52,
    width: 52,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: 12,
    color: 'rgba(121, 124, 123, 0.39)',
  },
});

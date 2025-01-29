import React, {useEffect, useState} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import IMAGES from '../../Assets/images';
import AddUserButton from './AddUserButton';
import {useDispatch} from 'react-redux';
import {chatUsers, contact} from '../redux/store/slice/authSlice';
import auth from '@react-native-firebase/auth';

function SearchList({users}) {
  const [addfriend, setaddfriend] = useState<boolean>();
  const dispatch = useDispatch();
  const frinedlist = users.item.contact;
  const currentUser = auth().currentUser;

  useEffect(() => {
    if (frinedlist && currentUser) {
      const friends = frinedlist.filter(friend => friend === currentUser?.uid);
      setaddfriend(friends.length > 0);
    }
  }, [users, currentUser, frinedlist]);

  console.log(frinedlist);
  const defaultStatus: string = 'be your own';
  const secondUser = users.item.id;

  const addFriend = () => {
    if (currentUser && secondUser)
      dispatch(
        contact({currentUserId: currentUser.uid, otherUserID: secondUser}),
      );
    setaddfriend(true);
  };

  console.log(users.item);
  return (
    <View style={styles.searchProfiles}>
      <View style={styles.imgDiv}>
        <Image
          source={
            users.item.images && users.item.images.trim() !== ''
              ? {uri: users.item.profilePic}
              : IMAGES.profileIcon
          }
          style={styles.imgD}
        />
      </View>
      <View>
        <Text style={styles.heading}>{users.item.UserName}</Text>
        <Text style={styles.msg}>
          {users.item.status && users.item.status.trim() !== ' '
            ? users.item.status
            : defaultStatus}
        </Text>
      </View>
      {addfriend ? <Text>Friends</Text> : <AddUserButton onPress={addFriend} />}
    </View>
  );
}

export default SearchList;
const styles = StyleSheet.create({
  searchProfiles: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  imgDiv: {
    height: 52,
    width: 52,
  },
  imgD: {height: 52, width: 52},
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: 12,
    color: 'rgba(121, 124, 123, 0.39)',
  },
});

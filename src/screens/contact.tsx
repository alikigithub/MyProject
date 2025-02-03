import React, {useLayoutEffect} from 'react';
import IMAGES from '../../Assets/images';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ContactListData from '../components/ContactListData';
import ChatUsers from '../components/ChatUser';

// Utility function to group users by the first letter of their name
const groupUsersByLetter = users => {
  return users.reduce((groups, user) => {
    const firstLetter = user.UserName[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(user);
    return groups;
  }, {});
};

export default function Contact({navigation}) {
  const listofUsers = useSelector(state => state.authSlice.addUsers);

  const groupedUsers = groupUsersByLetter(listofUsers);

  const sections = Object.keys(groupedUsers).sort();

  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <Text style={styles.headingTxt}>Contact</Text>
        </View>
        <View style={styles.homeMain}>
          <FlatList
            data={sections} // Render the section headers (A, B, C, etc.)
            keyExtractor={item => item}
            renderItem={({item: letter}) => (
              <View>
                <Text style={styles.letterHeader}>{letter}</Text>
                <FlatList
                  data={groupedUsers[letter]} // Render users under each letter
                  keyExtractor={user => user.id}
                  renderItem={({item}) => (
                    <ChatUsers items={{item}} navigation={navigation} />
                  )}
                />
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  topBar: {
    height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  headingTxt: {
    fontSize: 20,
    color: 'white',
  },
  homeMain: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    borderWidth: 1,
  },
  letterHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: 'black',
  },
});

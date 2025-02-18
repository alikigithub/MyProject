import React from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import IMAGES from '../../Assets/images';
import ChatUsersContacts from '../components/ChatUsersContact';
import {useAppSelector} from '../cutomHooks/useRedux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SmallLoader from '../components/SmallLoader';

type RootStackParamList = {
  Contact: undefined;
  Chat: {userId: string};
};

type ContactProps = NativeStackScreenProps<RootStackParamList, 'Contact'>;

type User = {
  id: string;
  UserName: string;
};

const groupUsersByLetter = (users: User[]) => {
  return users.reduce<Record<string, User[]>>((groups, user) => {
    const firstLetter = user.UserName[0]?.toUpperCase() || '#';
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(user);
    return groups;
  }, {});
};

export default function Contact({navigation}: ContactProps) {
  const listOfUsers = useAppSelector(state => state.authSlice.addUsers);
  const contactLoader = useAppSelector(
    state => state.authSlice.chatUsersloader,
  );
  const groupedUsers = groupUsersByLetter(listOfUsers);
  const sections = Object.keys(groupedUsers).sort();

  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <Text style={styles.headingTxt}>Contacts</Text>
        </View>
        <View style={styles.homeMain}>
          {contactLoader ? (
            <SmallLoader />
          ) : (
            <FlatList
              data={sections}
              keyExtractor={item => item}
              contentContainerStyle={styles.flatListContainer}
              removeClippedSubviews
              showsVerticalScrollIndicator={false} // Hide vertical scrollbar
              showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
              renderItem={({item: letter}) => (
                <View style={styles.section}>
                  <Text style={styles.letterHeader}>{letter}</Text>
                  <FlatList
                    data={groupedUsers[letter]}
                    keyExtractor={user => user.id}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false} // Hide vertical scrollbar
                    showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
                    renderItem={({item}) => (
                      <ChatUsersContacts
                        items={{item}}
                        navigation={navigation}
                      />
                    )}
                  />
                </View>
              )}
            />
          )}
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
    height: '12%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
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
  flatListContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  letterHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#003366',
  },
});

import React from 'react';
import {FlatList, ImageBackground, Text, View} from 'react-native';
import IMAGES from '../../../Assets/images';
import ChatUsersContacts from '../../components/ChatUsersContact/ChatUsersContact';
import SmallLoader from '../../components/SmallLoader/SmallLoader';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {styles} from './ContactStyle';
import useContacts from '../../cutomHooks/useContact';

type RootStackParamList = {
  Contact: undefined;
  Chat: {userId: string};
};

type ContactProps = NativeStackScreenProps<RootStackParamList, 'Contact'>;

export default function Contact({navigation}: ContactProps) {
  const {groupedUsers, sections, contactLoader} = useContacts();
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
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item: letter}) => (
                <View style={styles.section}>
                  <Text style={styles.letterHeader}>{letter}</Text>
                  <FlatList
                    data={groupedUsers[letter]}
                    keyExtractor={user => user.id}
                    removeClippedSubviews
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
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

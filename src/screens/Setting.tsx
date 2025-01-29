import React, {useLayoutEffect, useState} from 'react';
import IMAGES from '../../Assets/images';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Setting() {
  const [profile, setprofile] = useState();
  const currentID = auth().currentUser?.uid;
  const UserName: string = currentID?.displayName;
  useLayoutEffect(() => {
    const getProfile = async () => {
      try {
        const userDoc = await firestore()
          .collection('Users')
          .doc(currentID)
          .get();
        const profilepic = userDoc.data()?.profilePic;
        setprofile(profilepic);
        return profile;
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);
  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <View style={styles.backtick}>
            <Image source={IMAGES.backtickWhite} />
          </View>
          <Text style={styles.headingTxt}>Setting</Text>
        </View>

        <View style={styles.homeMain}>
          <View>
            <Image
              source={profile !== '' ? {uri: profile} : IMAGES.profileIcon}
              style={styles.profilePic}
            />
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profilePic: {height: 55, width: 55},
  backtick: {
    flexGrow: 0.5,
  },
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
  },
  headingTxt: {
    fontSize: 20,
    color: 'white',
  },
  searchText: {
    color: 'white',
    fontSize: 16,
  },
  homeMain: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

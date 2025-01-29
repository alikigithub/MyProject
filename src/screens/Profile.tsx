import React, {useState} from 'react';
import IMAGES from '../../Assets/images';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

export default function Profile() {
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
          <Text style={styles.headingTxt}>Profile</Text>
        </View>

        <View style={styles.homeMain}>
          <Text>Welcome to the Home Page</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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

import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import IMAGES from '../../../Assets/images';
import ChatUsers from '../../components/chatUser/chatUser';
import {Text} from '@react-navigation/elements';
import SmallLoader from '../../components/smallLoader/smallLoader';
import {styles} from './HomeStyle';
import useHome from '../../cutomHooks/useHome';

export default function Home({navigation}: any) {
  const {profile, memoListOfUsers, loading} = useHome();

  return (
    <ImageBackground
      source={IMAGES.backgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.navigate('searchBar')}>
            <View style={styles.iconContainer}>
              <Image source={IMAGES.searchIcon} style={styles.icon} />
            </View>
          </TouchableOpacity>

          <Text style={styles.heading}>Home</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingNavigation')}
            style={
              profile?.trim() !== ''
                ? styles.imgStyle
                : styles.profilePicContainer
            }>
            <Image
              source={
                profile?.trim() !== '' ? {uri: profile} : IMAGES.profileIcon
              }
              style={styles.profilePic}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.homeMain}>
          <View style={styles.subHome}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <SmallLoader />
              </View>
            ) : (
              <FlatList
                data={memoListOfUsers}
                renderItem={item => (
                  <ChatUsers items={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyText}>
                    <Text style={styles.emptyText1}>
                      Sorry, there is no Data
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

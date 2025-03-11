import React from 'react';
import IMAGES from '../../../Assets/images';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonTem from '../../components/ButtonTem/ButtonTem';
import {styles} from './SettingStyle';
import useSetting from '../../cutomHooks/useSetting';
export default function Setting({navigation}: any) {
  const {userName, profile, status, signOut} = useSetting();

  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.parentView}>
        <View style={styles.topBar}>
          <Text style={styles.headingTxt}>Setting</Text>
        </View>
        <View style={styles.homeMain}>
          <TouchableOpacity
            style={styles.profilehead}
            onPress={() => navigation.navigate('Profile')}>
            <View style={styles.containerHead}>
              <View style={styles.centerlized}>
                <View style={styles.imgStyle}>
                  <Image
                    source={
                      profile?.trim() !== ''
                        ? {uri: profile}
                        : IMAGES.profileIcon
                    }
                    style={styles.profilePic}
                  />
                </View>
                <View style={styles.datacenter}>
                  <Text style={styles.userName}>{userName}</Text>
                  <Text style={styles.statusData}>
                    {status?.trim() !== '' ? status : 'Never give up 💪'}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.iconsContainer}>
            <View style={styles.notificationBar}>
              <View style={styles.divColor}>
                <Image source={IMAGES.notification} style={styles.iconimg} />
              </View>
              <View>
                <Text style={styles.iconText}>Notification</Text>
                <Text style={styles.iconText2}>Messages, group and others</Text>
              </View>
            </View>
            <View style={styles.notificationBar}>
              <View style={styles.divColor}>
                <Image source={IMAGES.help} style={styles.iconimg} />
              </View>
              <View>
                <Text style={styles.iconText}>Help</Text>
                <Text style={styles.iconText2}>
                  Help center, contact us, privacy policy
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationBar}
              onPress={() => navigation.navigate('changePassword')}>
              <View style={styles.divColor}>
                <Image source={IMAGES.user} style={styles.iconimg} />
              </View>
              <View>
                <Text style={styles.iconText}>Change Password</Text>
                <Text style={styles.iconText2}>Change Account Password</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.notificationBar}>
              <View style={styles.divColor}>
                <Image source={IMAGES.user2} style={styles.iconimg} />
              </View>
              <View>
                <Text style={styles.iconText}>Invite a friend</Text>
              </View>
            </View>
            <View style={styles.endBtn}>
              <ButtonTem
                buttonType="default"
                onPress={signOut}
                titleName="signout"
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

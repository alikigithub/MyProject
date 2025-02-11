import React from 'react';
import IMAGES from '../../Assets/images';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonTemp from '../components/Button';
import {useAppSelector} from '../cutomHooks/useRedux';
import useLogout from '../cutomHooks/useLogout';

export default function Setting({navigation}: any) {
  const UserName: string = useAppSelector(state => state.authSlice.username);
  const profile: string = useAppSelector(state => state.authSlice.profilePic);
  const status: string = useAppSelector(state => state.authSlice.status);

  const {signOut} = useLogout();
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
              <View style={styles.imgStyle}>
                <Image
                  source={
                    profile?.trim() !== '' ? {uri: profile} : IMAGES.profileIcon
                  }
                  style={styles.profilePic}
                />
              </View>
              <View>
                <Text style={styles.userName}>{UserName}</Text>
                <Text style={styles.statusData}>
                  {status?.trim() !== '' ? status : 'Never give up 💪'}
                </Text>
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
                <Text style={styles.iconText2}>Change Account Password </Text>
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
              <ButtonTemp titleName="signout" onpress={signOut} />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  endBtn: {
    width: '100%',
    height: '36%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imgStyle: {
    marginTop: 10,
    height: 70,
    width: 70,
    borderRadius: 50,
    overflow: 'hidden',
  },
  iconimg: {
    width: 30,
    height: 30,
  },
  notificationBar: {
    marginTop: 10,
    height: 60,
    width: '90%',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 20,
  },

  iconText2: {
    color: '#797C7B63',
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  divColor: {
    width: 44,
    height: 44,
    backgroundColor: '#DEEBFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHead: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilehead: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F5F6F6',
  },
  statusData: {
    color: '#797C7B',
    fontSize: 15,
  },
  userName: {fontSize: 20, fontWeight: 500},
  profilePic: {height: 80, width: 80},
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
    justifyContent: 'center',
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  searchText: {
    color: 'white',
    fontSize: 16,
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
});

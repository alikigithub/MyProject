import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import IMAGES from '../../../Assets/images';
import ButtonTem from '../../components/buttonTem/buttonTem';
import {styles} from './ProfileStyle';
import useProfile from '../../cutomHooks/useProfile';
export default function Profile({navigation}: any) {
  const {
    profile,
    userNameData,
    statusData,
    email,
    setUserName,
    setStatusData,
    openGallery,
    updateProfile,
  } = useProfile();

  return (
    <ImageBackground
      source={IMAGES.backgroundImg}
      style={styles.background}
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}>
          <View style={styles.parentView}>
            <View style={styles.topBar}>
              <View style={styles.backtick}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('setting')}>
                  <Image source={IMAGES.backtickWhite} />
                </TouchableOpacity>
              </View>
              <Text style={styles.headingTxt}>Profile</Text>
            </View>

            <View style={styles.homeMain}>
              <TouchableOpacity onPress={openGallery}>
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
                <View style={styles.editView}>
                  <Image source={IMAGES.edit} style={styles.edit} />
                </View>
              </TouchableOpacity>
              <View style={styles.form}>
                <View style={styles.formUserName}>
                  <Text style={styles.formLables}>Your name</Text>
                  <TextInput
                    defaultValue={userNameData}
                    value={userNameData}
                    onChangeText={setUserName}
                    style={styles.input}
                  />
                </View>
                <View style={styles.formUserName}>
                  <Text style={styles.formLables}>Your email</Text>
                  <TextInput
                    defaultValue={email}
                    value={email}
                    readOnly
                    style={styles.input}
                  />
                </View>
                <View style={styles.formUserName}>
                  <Text style={styles.formLables}>Your status</Text>
                  <TextInput
                    defaultValue={statusData}
                    value={statusData}
                    onChangeText={setStatusData}
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <ButtonTem
                  buttonType="default"
                  onPress={updateProfile}
                  titleName="Update Profile"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

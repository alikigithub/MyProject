import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import IMAGES from '../../../Assets/images';
import styles from './SplashStyle';
function Splash() {
  return (
    <ImageBackground
      source={IMAGES.backgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.textpro}> Techhat</Text>
        <Image source={IMAGES.logoImg} />
      </View>
    </ImageBackground>
  );
}

export default Splash;

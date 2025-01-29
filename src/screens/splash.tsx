import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import IMAGES from '../../Assets/images';

function Splash({navigation}) {
  return (
    <ImageBackground
      source={IMAGES.BackgroundImg}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.textpro}> Techhat</Text>
        <Image source={IMAGES.LogoImg} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  textpro: {
    color: 'white',
    fontSize: 40,
    position: 'absolute',
    top: '43.5%',
  },
});

export default Splash;

import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IMAGES from '../../Assets/images';
import {Text} from '@react-navigation/elements';

interface ButtonTempProps {
  titleName: string;
  onpress: () => void;
}

function ButtonTemp({titleName, onpress}: ButtonTempProps) {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.loginBg} source={IMAGES.BackgroundImg}>
        <TouchableOpacity style={styles.loginBtn} onPress={onpress}>
          <Text style={styles.btnClr}>{titleName}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '92%',
    height: 48,
    borderRadius: 15,
    overflow: 'hidden',
  },
  loginBg: {
    width: '100%',
  },
  loginBtn: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClr: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
});
export default ButtonTemp;

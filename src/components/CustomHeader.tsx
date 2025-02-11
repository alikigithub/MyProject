import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import IMAGES from '../../Assets/images';

import {NavigationProp} from '@react-navigation/native';

function CustomHeader({navigation}: {navigation: NavigationProp<any>}) {
  return (
    <View style={styles.data}>
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Image source={IMAGES.backImg} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  data: {
    flex: 1,
    height: 145,
    width: 32,
    padding: 14,
  },
});
export default CustomHeader;

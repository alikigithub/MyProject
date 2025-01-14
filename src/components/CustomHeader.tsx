import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import IMAGES from '../../Assets/images';

function CustomHeader({navigation}) {
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

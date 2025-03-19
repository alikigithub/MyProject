import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import IMAGES from '../../../Assets/images';
import {styles} from './customHeaderStyle';
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

export default CustomHeader;

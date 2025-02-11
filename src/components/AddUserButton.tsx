import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import IMAGES from '../../Assets/images';

const AddUserButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={IMAGES.LogoImg} style={styles.icon} />
      <Text style={styles.text}>Add Friend</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877F2',
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default AddUserButton;

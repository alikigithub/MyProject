import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //

const SendButton = ({onpress}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onpress}>
        <Icon name="send" size={25} color="#1877F2" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
});

export default SendButton;

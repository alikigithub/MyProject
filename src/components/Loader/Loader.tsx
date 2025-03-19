import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {styles} from './loaderStyle';
const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loader;

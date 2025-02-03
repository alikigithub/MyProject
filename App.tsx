/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {SafeAreaView, StyleSheet} from 'react-native';
import AuthNavigation from './src/navigations/authNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';

function App(): React.JSX.Element {
 
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.contianer}>
        <AuthNavigation />
      </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
});

export default App;

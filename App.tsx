/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AuthNavigation from './src/navigations/authNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.contianer}>
        <GestureHandlerRootView style={{flex: 1}}>
          <AuthNavigation />
        </GestureHandlerRootView>
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

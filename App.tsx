/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaView} from 'react-native';
import AuthNavigation from './src/navigations/authNavigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.contianer}>
      <AuthNavigation />
    </SafeAreaView>
  );
}
const styles = {
  contianer: {
    flex: 1,
  },
};

export default App;

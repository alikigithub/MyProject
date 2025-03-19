import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${COLOR.rgba_white_90}`,
    zIndex: 1000,
  },
  loaderBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${COLOR.white}`,
    padding: 20,
    borderRadius: 10,
    shadowColor: `${COLOR.black}`,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: `${COLOR.navy_blue}`,
    fontWeight: 'bold',
  },
});

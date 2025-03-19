import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  searchplp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searhDetail: {
    width: '90%',
  },
  mainSearch: {
    flex: 1,
    alignItems: 'center',
  },
  searchPrt: {
    height: '15%',
    justifyContent: 'center',
    width: '90%',
  },
  searchDiv: {
    width: '100%',
    height: 50,
    backgroundColor: `${COLOR.light_gray}`,
    borderRadius: 15,
    position: 'relative',
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  cross: {
    position: 'absolute',
    top: '23%',
    right: 12,
    fontSize: 20,
  },
  srchImg: {
    position: 'absolute',
    top: '23%',
    left: 12,
  },
});

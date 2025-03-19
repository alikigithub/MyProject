import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  friend: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonsView: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSprofile: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    overflow: 'hidden',
  },
  searchProfiles: {
    width: '100%',
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
  },
  imgDiv: {
    height: 52,
    width: 52,
    overflow: 'hidden',
    borderRadius: 50,
  },
  imgD: {
    height: 52,
    width: 52,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  msg: {
    fontSize: 12,
    color: `${COLOR.gray_rgba_39}`,
  },
});

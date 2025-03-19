import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  addUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLOR.facebook_blue}`,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: `${COLOR.black}`,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    color: `${COLOR.white}`,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: `${COLOR.white}`,
  },
  sendButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  defaultButtonContainer: {
    width: '92%',
    height: 48,
    borderRadius: 15,
    overflow: 'hidden',
  },
  loginBg: {
    width: '100%',
  },
  loginBtn: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClr: {
    color: `${COLOR.white_rgba}`,
    fontSize: 16,
  },
});

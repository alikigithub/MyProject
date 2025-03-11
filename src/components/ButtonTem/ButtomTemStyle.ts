import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  addUserButton: {
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
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
  },
});

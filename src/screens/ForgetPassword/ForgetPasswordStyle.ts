import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const adjheight = height - 30;

export const styles = StyleSheet.create({
  forgetPassbtnDiv: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  forgetPassDiv: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: '2%',
  },
  forgetTx: {
    color: 'rgba(61, 74, 122, 1)',
    fontWeight: '500',
  },
  loginBg: {
    width: '100%',
    height: 48,
    borderRadius: 15,
    overflow: 'hidden',
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
  form: {
    width: '100%',
    height: 200,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(205, 209, 208, 1)',
  },
  inputLable: {
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(61, 74, 122, 1)',
  },
  lablemail: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 500,
    color: '    rgba(61, 74, 122, 1)',
  },
  lablePass: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: 500,
    color: 'rgba(61, 74, 122, 1)',
  },

  chatbox: {
    width: '100%',
    height: 125,
    alignItems: 'center',
    marginTop: 90,
  },
  chatboxPara: {
    fontSize: 18,
    color: 'rgba(121, 124, 123, 1)',
    textAlign: 'center',
    marginTop: 15,
  },
  chatboxText: {
    fontSize: 28,
    fontWeight: 700,
    color: 'rgba(61, 74, 122, 1)',
  },
  loginContainer: {
    position: 'relative',
    padding: 24,
    flex: 1,
    height: adjheight,
    alignItems: 'center',
  },
  backImg: {
    width: 24,
    height: 24,
  },
});

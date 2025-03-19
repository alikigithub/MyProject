import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLOR} from '../../constant/color';
const {height} = Dimensions.get('window');
const adjheight = height - 30;
export const styles = StyleSheet.create({
  loginBgParent: {
    position: 'absolute',
    width: '100%',
    bottom: '2%',
  },
  forgetDivParent: {
    width: '100%',
    height: 200,
    position: 'relative',
    borderWidth: 1,
  },
  ordiv: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  error: {
    color: 'red',
    width: '100%',
  },
  forgetPassDiv: {
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  forgetTx: {
    color: `${COLOR.rgba_navy_blue}`,
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
    color: `${COLOR.white_rgba}`,
    fontSize: 16,
  },
  form: {
    width: '100%',
    height: '38%',

    marginTop: '2%',
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.rgba_silver_gray}`,
  },
  inputLable: {
    fontSize: 14,
    fontWeight: 500,
    color: `${COLOR.rgba_navy_blue}`,
  },
  lablemail: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 500,
    color: `${COLOR.rgba_navy_blue}`,
  },
  lablePass: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: 500,
    color: `${COLOR.rgba_navy_blue}`,
  },
  googleDiv: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  afterText: {
    width: 122,
    height: 1,
    backgroundColor: `${COLOR.rgba_silver_gray}`,
  },
  beforeText: {
    width: 122,
    height: 1,
    backgroundColor: `${COLOR.rgba_silver_gray}`,
  },
  orText: {
    fontSize: 14,
    color: `${COLOR.rgba_dark_gray}`,
    fontWeight: 900,
  },
  googleLogo: {
    width: 58,
    height: 58,
  },
  chatbox: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  chatboxPara: {
    fontSize: 18,
    color: `${COLOR.rgba_dark_gray}`,
    textAlign: 'center',
    marginTop: 15,
  },
  chatboxText: {
    fontSize: 28,
    fontWeight: 700,
    color: `${COLOR.rgba_navy_blue}`,
  },
  loginContainer: {
    position: 'relative',
    padding: 24,
    flex: 1,
    height: adjheight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: {
    width: 24,
    height: 24,
  },
});

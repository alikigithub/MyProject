import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  viewDiv: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 24,
  },
  heading: {
    fontSize: 68,
    fontWeight: '400',
    color: `${COLOR.white}`,
    lineHeight: 1.2 * 68, // Adjust for readability
  },
  para: {
    fontSize: 16,
    fontWeight: '400',
    color: `${COLOR.rgba_white_50}`,
    marginTop: 39,
  },
  logoDiv: {
    flex: 1,
    alignItems: 'center',
    marginTop: 39,
    position: 'relative',
  },
  orText: {
    fontSize: 14,
    color: `${COLOR.white}`,
    fontWeight: '900',
    marginTop: 30,
  },
  beforeText: {
    width: 122,
    height: 1,
    backgroundColor: `${COLOR.rgba_light_pink_16}`,
    position: 'absolute',
    top: '27%',
    left: '3%',
  },
  afterText: {
    width: 122,
    height: 1,
    backgroundColor: `${COLOR.rgba_light_pink_16}`,
    position: 'absolute',
    top: '27%',
    right: '3%',
  },
  googleBtn: {
    width: 60,
    height: 60,
  },
  signUpBtn: {
    marginTop: 39,
    width: 327,
    height: 48,
    backgroundColor: `${COLOR.rgba_white_37}`,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: `${COLOR.white_rgba}`,
    fontSize: 16,
  },
  login: {
    marginTop: 39,
    fontSize: 14,
    fontWeight: '400',
    color: `${COLOR.white_rgba}`,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

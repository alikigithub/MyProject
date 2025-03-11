import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 24,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  chatbox: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatboxText: {
    fontSize: 28,
    fontWeight: '700',
    color: 'rgba(61, 74, 122, 1)',
  },
  chatboxPara: {
    fontSize: 18,
    color: 'rgba(121, 124, 123, 1)',
    textAlign: 'center',
    paddingTop: 15,
  },
  form: {
    marginTop: '5%',
    flexGrow: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(61, 74, 122, 1)',
    marginTop: 10,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(205, 209, 208, 1)',
    paddingVertical: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  loginBtnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnClr: {
    color: 'white',
    fontSize: 16,
  },
});

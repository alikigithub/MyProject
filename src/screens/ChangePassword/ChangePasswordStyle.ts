import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const adjheight = height - 50;
export const styles = StyleSheet.create({
  btnView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  formLabel: {
    color: '#3D4A7A',
    fontSize: 16,
  },
  formField: {
    marginBottom: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDD1D0',
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
  },
  form: {
    marginTop: 45,
    width: '90%',
    height: '60%',
    alignItems: 'center',
  },
  backtick: {
    flexGrow: 0.5,
  },
  parentView: {
    alignItems: 'center',
    height: adjheight,
  },
  background: {
    flex: 1,
  },
  topBar: {
    height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  homeMain: {
    width: '100%',
    height: '85%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

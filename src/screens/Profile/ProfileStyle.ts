import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLOR} from '../../constant/color';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  homeMain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  formLables: {
    color: `${COLOR.navy_blue}`,
    fontSize: 16,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
  },
  formUserName: {
    marginBottom: 10,
    marginTop: 20,
    width: '90%',
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: `${COLOR.silver_gray}`,
    justifyContent: 'center',
  },
  form: {
    width: '90%',
    alignItems: 'center',
  },
  editView: {
    height: 20,
    width: 20,
    borderRadius: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 1,
    right: 1,
  },
  edit: {
    height: 12,
    width: 12,
  },
  imgStyle: {
    marginTop: 10,
    height: width * 0.2,
    width: width * 0.2,
    borderRadius: width * 0.1,
    overflow: 'hidden',
    position: 'relative',
  },
  profilePic: {
    height: '100%',
    width: '100%',
  },
  backtick: {
    flexGrow: 0.5,
  },
  parentView: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  topBar: {
    height: height * 0.15,
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
});

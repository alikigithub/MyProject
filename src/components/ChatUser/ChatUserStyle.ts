import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  parentView: {
    height: '100%',
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  deleteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: `${COLOR.black}`,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hiddenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 1,
  },
  imgStyle: {
    marginTop: 10,
    height: 55,
    width: 55,
    borderRadius: 50,
    overflow: 'hidden',
  },
  subhome: {
    width: '90%',
    marginTop: 32,
    flexDirection: 'row',
    gap: 10,
    position: 'relative',
  },
  chatData: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imgDiv: {
    position: 'relative',
    width: 48,
  },
  profilePic: {
    height: 55,
    width: 55,
  },
});

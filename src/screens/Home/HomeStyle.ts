import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  profiledefault: {height: 60, width: 60},
  imgStyle: {
    marginTop: 10,
    height: 40,
    width: 40,
    borderRadius: 50,
    overflow: 'hidden',
  },
  subHome: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  homeMain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
  },
  parentView: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  loaderContainer: {
    position: 'absolute',
    left: '50%',
    height: 100,
    bottom: -150,
    transform: [{translateX: -25}, {translateY: -25}],
  },
  logout: {
    height: 20,
    width: 20,
    backgroundColor: 'green',
    borderWidth: 1,
  },
  logtxt: {
    color: 'pink',
  },
  topBar: {
    height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    backgroundColor: `${COLOR.rgba_white_20}`,
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  profilePicContainer: {
    marginTop: 10,
    height: 55,
    width: 55,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profilePic: {
    height: '100%',
    width: '100%',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  emptyText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  emptyText1: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

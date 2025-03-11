import {StyleSheet} from 'react-native';

StyleSheet;
export const styles = StyleSheet.create({
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  chatHeaderView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 50,
  },
  inputField: {
    height: 50,
    width: '80%',
    backgroundColor: '#F3F6F6',
    borderRadius: 10,
    paddingLeft: 10,
  },
  bottom: {
    height: 55,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F6F6',
    elevation: 2,
  },
  backImg: {
    width: 30,
    height: 25,
  },
  chatView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F3F6F6',
  },
});

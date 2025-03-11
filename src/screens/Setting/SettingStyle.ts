import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  centerlized: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '100%',
    gap: 10,
  },
  datacenter: {
    marginTop: 17,
  },

  endBtn: {
    width: '100%',
    height: '36%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imgStyle: {
    height: 70,
    width: 70,
    borderRadius: 50,
    overflow: 'hidden',
  },
  iconimg: {
    width: 30,
    height: 30,
  },
  notificationBar: {
    marginTop: 10,
    height: 60,
    width: '90%',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 20,
  },

  iconText2: {
    color: '#797C7B63',
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  divColor: {
    width: 44,
    height: 44,
    backgroundColor: '#DEEBFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHead: {
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  profilehead: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#F5F6F6',
  },
  statusData: {
    color: '#797C7B',
    fontSize: 15,
  },
  userName: {fontSize: 20, fontWeight: 500},
  profilePic: {height: 80, width: 80},
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
    height: '15%',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  searchText: {
    color: 'white',
    fontSize: 16,
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
});

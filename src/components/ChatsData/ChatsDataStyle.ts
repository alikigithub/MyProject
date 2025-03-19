import {StyleSheet} from 'react-native';
import {COLOR} from '../../constant/color';
export const styles = StyleSheet.create({
  chatContainer: {
    width: '100%',
    marginBottom: 10,
  },
  messageWrapper: {
    width: '90%',
    marginHorizontal: '5%',
  },
  alignRight: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  alignLeft: {
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profilepic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: `${COLOR.navy_blue}`,
  },
  sendDiv: {
    backgroundColor: `${COLOR.navy_blue}`,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  receiveDiv: {
    backgroundColor: `${COLOR.light_blue}`,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  SendText: {
    fontSize: 16,
    color: `${COLOR.white}`,
  },
  ReceiveText: {
    fontSize: 16,
    color: `${COLOR.black}`,
  },
  timeText: {
    fontSize: 12,
    color: `${COLOR.dark_gray}`,
    marginTop: 3,
  },
});

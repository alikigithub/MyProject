import {StyleSheet} from 'react-native';
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
    color: '#3D4A7A',
  },
  sendDiv: {
    backgroundColor: '#3D4A7A',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  receiveDiv: {
    backgroundColor: '#F2F7FB',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  SendText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  ReceiveText: {
    fontSize: 16,
    color: '#000000',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
});

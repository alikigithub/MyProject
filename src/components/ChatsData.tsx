import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

function ChatsData({items, userName, index, messages}) {
  const senderID = items.sender;
  const currentID = auth().currentUser?.uid;
  console.log(currentID);
  console.log(messages);
  const showMessage =
    senderID !== currentID &&
    (index === 0 || messages[index - 1]?.sender !== senderID);

  return (
    <View style={styles.chatContainer}>
      <View style={styles.mainDiv}>
        <View style={styles.container}>
          {showMessage && (
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}> {userName}</Text>
            </View>
          )}
          <View
            style={senderID !== currentID ? styles.receiveDiv : styles.sendDiv}>
            <Text
              style={
                senderID !== currentID ? styles.ReceiveText : styles.SendText
              }>
              {items.text}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  userNameContainer: {
    width: '100%',
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  secondUser: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  showName: {},

  chatContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainDiv: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    position: 'relative',
    width: '100%',
    height: 40,
  },
  receiveContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
  },
  sendDiv: {
    backgroundColor: '#3D4A7A',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 1,
  },
  receiveDiv: {
    backgroundColor: '#F2F7FB',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 1,
  },
  SendText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  ReceiveText: {
    fontSize: 16,
    color: '#black',
  },
});
export default ChatsData;

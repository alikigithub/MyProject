import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Message} from '../types/type';

function ChatsData({
  items,
  userName,
  index,
  messages,
  profile,
}: {
  items: Message;
  userName: string;
  index: number;
  messages: Message[];
  profile: string;
}) {
  const senderID = items.sender;
  const currentID = auth().currentUser?.uid;
  const showMessage =
    senderID !== currentID && messages[index + 1]?.sender !== senderID;

  return (
    <View style={styles.chatContainer}>
      <View style={styles.mainDiv}>
        {showMessage && (
          <View style={styles.userInfo}>
            <Image
              style={styles.profilepic}
              source={
                profile.trim() !== ''
                  ? {uri: profile}
                  : require('../../Assets/images/profile.png')
              }
            />
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
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainDiv: {
    width: '90%',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '70%',
  },
  receiveDiv: {
    backgroundColor: '#F2F7FB',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    maxWidth: '70%',
  },
  SendText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  ReceiveText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default ChatsData;

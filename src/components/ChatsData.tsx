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
  createdAt,
}: {
  items: Message;
  userName: string;
  index: number;
  messages: Message[];
  profile: string;
  createdAt: any;
}) {
  const senderID = items.sender;
  const currentID = auth().currentUser?.uid;
  const showMessage =
    senderID !== currentID && messages[index + 1]?.sender !== senderID;

  const formatTime = (timestamp: any) => {
    if (!timestamp) {
      return '';
    }

    let date;
    if (timestamp?.toDate) {
      date = timestamp.toDate();
    } else {
      date = new Date(timestamp);
    }

    return isNaN(date.getTime())
      ? ''
      : date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
  };

  const formattedTime = formatTime(createdAt);

  return (
    <View style={styles.chatContainer}>
      <View
        style={[
          styles.messageWrapper,
          senderID === currentID ? styles.alignRight : styles.alignLeft,
        ]}>
        {showMessage && (
          <View style={styles.userInfo}>
            <Image
              style={styles.profilepic}
              source={
                profile?.trim()
                  ? {uri: profile}
                  : require('../../Assets/images/profile.png')
              }
            />
            <Text style={styles.userName}>{userName}</Text>
          </View>
        )}
        <View
          style={senderID === currentID ? styles.sendDiv : styles.receiveDiv}>
          <Text
            style={
              senderID === currentID ? styles.SendText : styles.ReceiveText
            }>
            {items.text}
          </Text>
        </View>
        {formattedTime ? (
          <Text
            style={[
              styles.timeText,
              senderID === currentID ? styles.alignRight : styles.alignLeft,
            ]}>
            {formattedTime}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default ChatsData;

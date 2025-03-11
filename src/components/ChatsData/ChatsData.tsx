import React from 'react';
import {View, Text, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import {ChatsDatatype} from '../../types/type';
import {styles} from './ChatsDataStyle';
import {Timestamp} from '@react-native-firebase/firestore';
function ChatsData({
  items,
  userName,
  index,
  messages,
  profile,
  createdAt,
}: ChatsDatatype) {
  const senderID = items.sender;
  const currentID = auth().currentUser?.uid;
  const showMessage =
    senderID !== currentID && messages[index + 1]?.sender !== senderID;

  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) {
      return '';
    }

    let date;
    if (timestamp?.toDate) {
      date = timestamp.toDate();
    } else {
      date = timestamp.toDate();
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
                profile.trim()
                  ? {uri: profile}
                  : require('../../../Assets/images/profile.png')
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

export default ChatsData;

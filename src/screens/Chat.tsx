import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import IMAGES from '../../Assets/images';
import SendButton from '../components/SendButton';
import {sendMessage} from '../redux/store/slice/authSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ChatsData from '../components/ChatsData';
import {useAppDispatch} from '../cutomHooks/useRedux';

function ChatScreen({route, navigation}: any) {
  const [message, setMessage] = useState('');
  const [messagesData, setMessagesData] = useState<any>([]);
  const {user} = route.params;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const chatRef = firestore()
      .collection('Chat')
      .doc(user.chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = chatRef.onSnapshot(snapshot => {
      if (!snapshot.empty) {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().text || '',
          sender: doc.data().sender || '',
          createdAt: doc.data().createdAt || new Date(),
          ...doc.data(),
        }));
        setMessagesData(fetchedMessages);
      } else {
        setMessagesData([]);
      }
    });

    return () => unsubscribe();
  }, [user.chatId]);

  const messageSend = () => {
    if (!message.trim()) {
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser?.uid) {
      return;
    }

    dispatch(
      sendMessage({
        senderID: currentUser.uid,
        ReceiverID: user.otherUserID,
        textMsg: message.trim(),
        combineID: user.chatId,
      }),
    );
    setMessage('');
  };

  return (
    <View style={styles.mainChat}>
      <View style={styles.chatHeader}>
        <View style={styles.chatHeaderView}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={IMAGES.backImg} style={styles.backImg} />
          </TouchableOpacity>
          <View style={styles.userNameContainer}>
            <Image
              style={styles.profilePic}
              source={
                user.profile.trim() !== ''
                  ? {uri: user.profile}
                  : require('../../Assets/images/profile.png')
              }
            />
            <Text style={styles.userName}>{user.otherUserName}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chatView}>
        <FlatList
          data={messagesData}
          keyExtractor={item => item.id || Math.random().toString()}
          renderItem={({item, index}) => (
            <ChatsData
              items={{
                ...item,
                text: item.text || '',
                sender: item.sender || '',
                createdAt: item.createdAt || new Date(),
              }}
              userName={user.otherUserName}
              messages={messagesData}
              index={index}
              profile={user.profile}
              createdAt={item.createdAt}
            />
          )}
          inverted
        />
      </View>

      <View style={styles.bottom}>
        <TextInput
          style={styles.inputField}
          placeholder="Write your message..."
          value={message}
          onChangeText={setMessage}
        />
        <SendButton onpress={messageSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderWidth: 1,
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

export default ChatScreen;

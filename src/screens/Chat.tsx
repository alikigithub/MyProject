import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import IMAGES from '../../Assets/images';
import SendButton from '../components/SendButton';
import {useDispatch} from 'react-redux';
import {sendMessage} from '../redux/store/slice/authSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ChatsData from '../components/ChatsData';
function ChatScreen({route, navigation}) {
  const [message, setmessage] = useState('');
  const [messagesData, setmessagesData] = useState([]);
  const {user} = route.params;
  console.log(user.otherUserName);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const useRef = firestore()
          .collection('Chat')
          .doc(user.chatId)
          .collection('messages')
          .orderBy('createdAt', 'desc');

        useRef.onSnapshot(snapshot => {
          if (!snapshot.empty) {
            const fetchMesages = snapshot.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            setmessagesData(fetchMesages);
          } else {
            return [];
          }
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchData();
  }, []);
  console.log(message);
  const messageSend = () => {
    if (message.trim() === '') return;
    else {
      dispatch(
        sendMessage({
          senderID: auth().currentUser.uid,
          ReceiverID: user.otherUserID,
          textMsg: message,
          combineID: user.chatId,
        }),
      );
      setmessage('');
    }
  };
  return (
    <View style={styles.mainChat}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={IMAGES.backImg} style={styles.backImg} />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.otherUserName}</Text>
      </View>
      <View style={styles.chatView}>
        <FlatList
          data={messagesData}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <ChatsData
              items={item}
              userName={user.otherUserName}
              messages={messagesData}
              index={index}
            />
          )}
          inverted
        />
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.inputField}
          placeholder="write Your Message"
          value={message}
          onChangeText={setmessage}
        />
        <SendButton onpress={messageSend} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputField: {
    height: 50,
    width: '80%',
    backgroundColor: '#F3F6F6',
    borderRadius: 10,
  },
  bottom: {
    height: '10%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainChat: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeader: {
    width: '90%',
    height: '6%',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  backImg: {
    width: 30,
    height: 25,
  },
  chatView: {
    height: '84%',
    borderWidth: 1,
    width: '100%',
  },
});

export default ChatScreen;

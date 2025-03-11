import {useState, useLayoutEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {sendMessage} from '../redux/slice/chatSlice';
import {useAppDispatch} from '../cutomHooks/useRedux';
import {Message} from '../types/type';

const useChat = (chatId: string, otherUserID: string, _profile: string) => {
  const [message, setMessage] = useState('');
  const [messagesData, setMessagesData] = useState<Message[]>([]);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    const chatRef = firestore()
      .collection('Chat')
      .doc(chatId)
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
  }, [chatId]);

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
        ReceiverID: otherUserID,
        textMsg: message.trim(),
        combineID: chatId,
      }),
    );
    setMessage('');
  };

  return {
    message,
    setMessage,
    messagesData,
    messageSend,
  };
};

export default useChat;

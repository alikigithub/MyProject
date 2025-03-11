import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {styles} from './ChatStyle';
import Button from '../../components/ButtonTem/ButtonTem';
import ChatsData from '../../components/ChatsData/ChatsData';
import useChat from '../../cutomHooks/useChat';
import IMAGES from '../../../Assets/images';

function ChatScreen({route, navigation}: any) {
  const {user} = route.params;
  const {message, setMessage, messagesData, messageSend} = useChat(
    user.chatId,
    user.otherUserID,
    user.profile,
  );
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
                user?.profile?.trim() !== ''
                  ? {uri: user.profile}
                  : require('../../../Assets/images/profile.png')
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
              items={item}
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
        <Button buttonType="send" onPress={messageSend} />
      </View>
    </View>
  );
}

export default ChatScreen;

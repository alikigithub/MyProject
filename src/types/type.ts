import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {NavigationProp} from '@react-navigation/native';

export type signUp = {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  userid: string;
  contacts: any;
  profilePic: string;
  status: string;
  searchUser: UserData[];
  searchLoading: boolean;
  homeContactData: UserData[];
  homedataofUsers: UserDatasa[];
  deleteLoader: boolean;
  loginError: string;
  getHomeUsersloader: boolean;
  chatUsersloader: boolean;
};
export type chatTypes = {
  addUsers: UserData[];
  homeContact: string[];
};
export interface UserDataa {
  chatSlice: {
    addUsers: UserContact[];
  };
}
export type contactstype = {[key: string]: string};
export type chatboxType = {};
export type userDetail = {
  id: string;
  UserName: string;
  profilePic: string;
  status: string;
};
export type detailtype = {
  id: string;
  UserName: string;
};
export type filerdataType = {
  id: string;
  username: string;
  profilePic: string;
};
export type filterData = {
  id: string;
  username: string;
  profilePic: string;
  status: string;
};
export type searchtype = {
  searchdata: string;
};
export type filterUser = {
  UserName: string;
};
export type chatuser = {
  chatId: string;
  profile: string;
  otherUserID: string;
  otherUserName: string;
};

export type UserData = {
  id: string;
  homeContact: string[];
  status: string;
  contact: string[];
  profilePic: string;
  profile: string;
  UserName: string;
  Email: string;
};
export type UserDatasa = {
  id: string;
  homeContact: string[];
  status: string;
  contact: string[];
  profilePic: string;
  UserName: string;
  Email: string;
};
export type useChatType = {
  chatId: string;
  otherUserID: string;
  _profile: string;
};

export type Timestamp = {
  seconds: number;
  nanoseconds: number;
};

export type ChatMessages = Message[];

export type Message = {
  id: string;
  text: string;
  sender: string;
  createdAt: FirebaseFirestoreTypes.Timestamp | null;
};
export type ChatUsersContactsProps = {
  items: {
    item: {
      id: string;
      profile: string;
      UserName: string;
    };
  };
  navigation: NavigationProp<any>;
};
export type ChatsDatatype = {
  items: Message;
  userName: string;
  index: number;
  messages: Message[];
  profile: string;
  createdAt: any;
};
export type UserContact = {
  id: string;
  UserName: string;
  profile: string;
  profilePic: string;
};

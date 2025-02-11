import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export type signUp = {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  userid: string;
  contacts: any;
  profilePic: string;
  status: string;
  searchUser: any[];
  addUsers: userdata[];
  searchLoading: boolean;
  homeContact: string[];
  homeContactData: string[];
  homedataofUsers: string[];
  deleteLoader: boolean;
  loginError: string;
};
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
export type userdata = userDetail[];
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
export type Message = {
  id: string;
  text: string;
  sender: string;
  createdAt: FirebaseFirestoreTypes.Timestamp | null;
};

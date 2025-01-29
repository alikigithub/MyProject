export type signUp = {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  userid: string;
  contacts: string[];
  profilePic: string;
  searchUser: userdata[];
  addUsers: userdata[];
  searchLoading: boolean;
};
export type chatboxType = {};
export type userDetail = {
  id: string;
  username: string;
  profilePic: string;
  status: string;
};
export type filterData = Array<{
  id: string;
  UserName: string;
  profilePic: string;
  status: string;
}>;
export type userdata = {
  users: [userDetail];
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

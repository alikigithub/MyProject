import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, userdata} from '../../../types/type';
import auth, {
  reauthenticateWithCredential,
  updatePassword,
} from '@react-native-firebase/auth';
import firestore, {getDocs} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {produce} from 'immer';
export const signInWithGoogle = createAsyncThunk('withGoogle', async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.data?.idToken as string,
    );
    const userCredential = await auth().signInWithCredential(googleCredential);
    const fullUser = userCredential.user;
    const userDocRef = firestore().collection('Users').doc(fullUser.uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      await userDocRef.set({
        UserName: fullUser.displayName,
        Email: fullUser.email,
        profilePic: fullUser.photoURL,
        status: '',
        contact: [],
      });
    } else {
      const currentUserName = userDoc.data()?.UserName;
      const currentProfilePic = userDoc.data()?.profilePic;
      const currentStatus = userDoc.data()?.status;
      const contacts = userDoc.data()?.contact;

      if (!currentUserName) {
        await userDocRef.update({
          UserName: fullUser.displayName,
        });
      }
      if (!contacts) {
        await userDocRef.update({
          contact: [],
        });
      }

      if (!currentProfilePic) {
        await userDocRef.update({
          profilePic: fullUser.photoURL,
        });
      }

      if (!currentStatus) {
        await userDocRef.update({
          status: '',
        });
      }
    }

    Alert.alert('Google Sign-In successful!');
    return {
      UserName: userDoc.data()?.UserName || fullUser.displayName,
      Email: fullUser.email,
      Status: userDoc.data()?.status || '',
      profilePic: userDoc.data()?.profilePic || fullUser.photoURL,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    Alert.alert('Google Sign-In Error', errorMessage);
  }
});
export const updateContactList = createAsyncThunk(
  'updateList',
  async ({deleteID}: {deleteID: string}) => {
    const userid = auth().currentUser?.uid;
    const useRef = firestore().collection('Users').doc(userid);
    try {
      await useRef.update({
        homeContact: firestore.FieldValue.arrayRemove(deleteID),
      });
      return deleteID;
    } catch (error) {}
  },
);
export const signUpUser = createAsyncThunk(
  'signUp/Authentication',
  async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      await user.updateProfile({
        displayName: username,
      });
      await firestore().collection('Users').doc(user.uid).set({
        UserName: username,
        Email: email,
        contact: [],
        profilePic: '',
        status: '',
        homeContact: [],
      });
      return {
        UserName: username,
        Email: email,
        contact: [],
        profilePic: '',
        status: '',
        homeContact: [],
      };
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during sign up');
    }
  },
);

export const loginUser = createAsyncThunk(
  'login/Authentication',
  async ({email, password}: {email: string; password: string}) => {
    try {
      const usercredentials = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const username = await firestore()
        .collection('Users')
        .doc(usercredentials.user.uid)
        .get();
      console.log(username.data()?.status);
      const user = username.exists ? username.data()?.UserName : null;
      return {
        userName: user,
        UserID: usercredentials.user.uid,
        email: usercredentials.user.email,
        Status: username.data()?.status,
        ProfilePic: username.data()?.profilePic,
      };
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Email Does not Exist');
      }
    }
  },
);
export const search = createAsyncThunk('Search/Users', async () => {
  try {
    const current = auth().currentUser;
    const userdataquery = firestore().collection('Users');
    const querysnapshot = await getDocs(userdataquery);

    const usersdata = querysnapshot.docs
      .filter(user => current?.uid !== user.id)
      .map(user => ({
        id: user.id,
        ...user.data(),
      }));
    return usersdata;
  } catch (error) {}
});
export const contact = createAsyncThunk(
  'Conatct/User',
  async (
    {
      currentUserId,
      otherUserID,
    }: {
      currentUserId: string;
      otherUserID: string;
    },
    thunkAPI,
  ) => {
    try {
      const useRef = firestore().collection('Users');
      await useRef.doc(currentUserId).update({
        contact: firestore.FieldValue.arrayUnion(otherUserID),
      });
      await useRef.doc(otherUserID).update({
        contact: firestore.FieldValue.arrayUnion(currentUserId),
      });
      const [currentUserIdDoc, otherUserIDDoc] = await Promise.all([
        useRef.doc(currentUserId).get(),
        useRef.doc(otherUserID).get(),
      ]);
      const currentConteacts = currentUserIdDoc.data()?.contact;
      const otherContacts = otherUserIDDoc.data()?.contact;
      return {
        currentUserId,
        currentConteacts,
        otherUserID,
        otherContacts,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const chatUsers = createAsyncThunk('chatUsers/chat', async () => {
  const userId = auth().currentUser?.uid;

  const userDoc = await firestore().collection('Users').doc(userId).get();
  const arrayofIDs = userDoc.data()?.contact;

  const data = await Promise.all(
    arrayofIDs.map(async (idData: any) => {
      const idsData = await firestore().collection('Users').doc(idData).get();
      if (idsData.exists) {
        return {
          id: idsData.id,
          ...idsData.data(),
        };
      }
      return null;
    }),
  );
  return data.filter(user => user !== null);
});

export const homeUsers = createAsyncThunk(
  'homeUsers/chat',
  async (userId: string) => {
    const currentid = auth().currentUser?.uid;

    const useref = firestore().collection('Users').doc(currentid);
    const userDoc = await useref.get();

    const arrayofIDs = userDoc.data()?.homeContact || [];

    if (!arrayofIDs.includes(userId)) {
      arrayofIDs.push(userId);
      await useref.update({
        homeContact: firestore.FieldValue.arrayUnion(userId),
      });
    }
    return arrayofIDs;
  },
);
export const getHomeUsers = createAsyncThunk('gethomeuser/chat', async () => {
  try {
    const current = auth().currentUser?.uid;

    const updatedDoc = await firestore().collection('Users').doc(current).get();
    const dataofUsers = updatedDoc.data()?.homeContact || [];

    const data = await Promise.all(
      dataofUsers.map(async (idData: any) => {
        if (idData !== current) {
          const idsData = await firestore()
            .collection('Users')
            .doc(idData)
            .get();
          if (idsData.exists) {
            return {
              id: idsData.id,
              ...idsData.data(),
            };
          }
        }
        return null;
      }),
    );
    return data.filter(user => user !== null);
  } catch (error) {
    console.error('Error fetching home users:', error);
    return [];
  }
});

export const sendMessage = createAsyncThunk(
  'sendMesage/chat',
  async ({
    senderID,
    ReceiverID,
    textMsg,
    combineID,
  }: {
    senderID: string;
    ReceiverID: string;
    textMsg: string;
    combineID: string;
  }) => {
    const chatRef = firestore().collection('Chat').doc(combineID);

    try {
      const snapShot = await chatRef.get();
      if (snapShot.exists) {
        await chatRef.collection('messages').add({
          text: textMsg,
          sender: senderID,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        await chatRef.set({
          chatID: combineID,
          partispents: [senderID, ReceiverID],
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        await chatRef.collection('messages').add({
          text: textMsg,
          sender: senderID,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {}
  },
);
export const sendprofilePic = createAsyncThunk(
  'sendPic/Chat',
  async ({userId, ProfileUrl}: {userId: string; ProfileUrl: string}) => {
    try {
      const useRef = firestore().collection('Users').doc(userId);
      await useRef.update({
        profilePic: ProfileUrl,
      });
      return ProfileUrl;
    } catch (error) {}
  },
);
export const sendstatus = createAsyncThunk(
  'statusUpdate/Chat',
  async ({userId, updatedStatus}: {userId: string; updatedStatus: string}) => {
    try {
      const useRef = firestore().collection('Users').doc(userId);
      await useRef.update({
        status: updatedStatus,
      });
      return updatedStatus;
    } catch (error) {}
  },
);
export const sendUserNmae = createAsyncThunk(
  'userNameUpdate/Chat',
  async ({
    userId,
    UpdateUserName,
  }: {
    userId: string;
    UpdateUserName: string;
  }) => {
    try {
      const useRef = firestore().collection('Users').doc(userId);
      await useRef.update({
        UserName: UpdateUserName,
      });
      return UpdateUserName;
    } catch (error) {}
  },
);
export const changePasswordSlice = createAsyncThunk(
  'updatePassword/chat',
  async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const current = auth().currentUser;
    try {
      const credential = auth.EmailAuthProvider.credential(
        current?.email || '',
        currentPassword,
      );
      if (current) {
        await reauthenticateWithCredential(current, credential);
      } else {
        throw new Error('No current user found');
      }
      await updatePassword(current, newPassword);
      Alert.alert('Password updated successfully!');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        Alert.alert('The current password is incorrect. Please try again.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('New password is too weak. Use at least 6 characters.');
      } else {
        Alert.alert(error.message);
      }
    }
  },
);
export const forgetPassword = createAsyncThunk(
  'forgetPassword/chat',
  async (email: string) => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('email send ');
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid Email');
      }
      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found with this email address');
      } else {
        Alert.alert(error.code);
      }
    }
  },
);
const initialState = {
  username: '',
  password: '',
  email: ' ',
  loading: false,
  userid: '',
  contacts: {},
  profilePic: '',
  status: '',
  searchUser: [] as userdata[],
  addUsers: [],
  searchLoading: false,
  homeContact: [],
  homeContactData: [],
  homedataofUsers: [],
  deleteLoader: false,
  loginError: '',
  getHomeUsersloader: false,
  chatUsersloader: false,
} as signUp;

const authSlice = createSlice({
  name: 'signUp',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    homelistData: (state, action) => {
      state.homeContactData = action.payload;
    },
    contactlist: (state, action) => {
      state.chatUsersloader = action.payload;
    },
    searchUserUpdate: (state, action) => {
      const firstuser = auth()?.currentUser?.uid;
      const secondid = action.payload;

      if (!firstuser || !secondid) {
        return;
      }

      state.contacts = {
        ...state.contacts,
        [firstuser]: [...(state.contacts[firstuser] || []), secondid],
        [secondid]: [...(state.contacts[secondid] || []), firstuser],
      };
    },
    currentUserUpdate: state => {
      state.userid = auth().currentUser?.uid || '';
    },
    updatedel: (state, action) => {
      const homedata = state.homedataofUsers.filter(
        (userid: any) => userid.id !== action.payload,
      );

      state.homedataofUsers = homedata;
    },

    updateSearch: (state, action) => {
      return produce(state, draft => {
        if (draft.searchUser[0]) {
          draft.searchUser[0].contact = [
            ...draft.searchUser[0].contact,
            action.payload,
          ];
        }

        draft.searchUser = [...draft.searchUser];
      });
    },
    chathome: (state, action) => {
      console.log(action.payload);
      console.log(state.homedataofUsers);
    },
  },
  extraReducers: builder => {
    builder

      .addCase(signUpUser.pending, state => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.UserName;
        state.email = action.payload.Email;
        state.profilePic = action.payload.profilePic;
        state.status = action.payload.status;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userid = action.payload?.UserID || '';
        state.username = action.payload?.userName;
        state.email = action.payload?.email || '';
        state.status = action.payload?.Status;
        state.profilePic = action.payload?.ProfilePic;
      })
      .addCase(search.pending, state => {
        state.loading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searchUser = action.payload || [];
        state.loading = false;
      })
      .addCase(contact.fulfilled, (state, action) => {
        const {currentUserId, currentConteacts, otherUserID, otherContacts} =
          action.payload;

        state.contacts = {
          ...state.contacts,
          [currentUserId]: [
            ...(state.contacts[currentUserId] || []),
            ...currentConteacts,
          ],
          [otherUserID]: [
            ...(state.contacts[otherUserID] || []),
            ...otherContacts,
          ],
        };
      })

      .addCase(chatUsers.fulfilled, (state, action) => {
        state.addUsers = action.payload;
      })
      .addCase(homeUsers.pending, state => {
        state.loading = true;
      })
      .addCase(homeUsers.fulfilled, (state, action) => {
        state.homeContact = action.payload;
        state.loading = false;
      })
      .addCase(sendprofilePic.pending, state => {
        state.loading = true;
      })
      .addCase(sendprofilePic.fulfilled, (state, action) => {
        state.profilePic = action.payload ?? '';
      })
      .addCase(sendUserNmae.fulfilled, (state, action) => {
        state.username = action.payload ?? '';
      })
      .addCase(sendstatus.fulfilled, (state, action) => {
        state.status = action.payload ?? '';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.username = action.payload?.UserName || '';
        state.email = action.payload?.Email || '';
        state.profilePic = action.payload?.profilePic || '';
        state.status = action.payload?.Status;
      })
      .addCase(getHomeUsers.pending, state => {
        state.getHomeUsersloader = true;
      })
      .addCase(getHomeUsers.fulfilled, (state, action) => {
        state.homedataofUsers = action.payload;
        state.getHomeUsersloader = false;
      })
      .addCase(updateContactList.pending, state => {
        state.deleteLoader = true;
      })
      .addCase(updateContactList.fulfilled, (state, action) => {
        state.homeContact = state.homeContact.filter(
          homedata => homedata !== action.payload,
        );
      });
  },
});
export const {
  resetState,
  homelistData,
  contactlist,
  searchUserUpdate,
  currentUserUpdate,
  updateSearch,
  updatedel,
  chathome,
} = authSlice.actions;
export default authSlice.reducer;

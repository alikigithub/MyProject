import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp, userdata} from '../../../types/type';
import auth, {
  reauthenticateWithCredential,
  updatePassword,
} from '@react-native-firebase/auth';
import firestore, {getDocs} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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
    console.log(userDoc.exists);

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

      console.log('UserName, profilePic, or status already set in Firestore');
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
    } catch (error) {
      console.log(error);
    }
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
      console.log(email, password);
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(userCredential.user);
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
      console.log(email, password);
      const usercredentials = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const username = await firestore()
        .collection('Users')
        .doc(usercredentials.user.uid)
        .get();
      console.log(username);
      const user = username.exists ? username.data()?.UserName : null;
      console.log(user);
      return {
        userName: user,
        UserID: usercredentials.user.uid,
        email: usercredentials.user.email,
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
    console.log(userdataquery);
    const querysnapshot = await getDocs(userdataquery);
    console.log(querysnapshot);

    const usersdata = querysnapshot.docs
      .filter(user => current?.uid !== user.id)
      .map(user => ({
        id: user.id,
        ...user.data(),
      }));
    return usersdata;
  } catch (error) {
    console.log('working', error);
  }
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
      console.log(currentUserId, otherUserID);
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
      console.log('currentuser ', currentConteacts);
      console.log('otheruserid', otherContacts);
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

  console.log('data add friend', data);
  return data.filter(user => user !== null);
});

export const homeUsers = createAsyncThunk(
  'homeUsers/chat',
  async (userId: string) => {
    const currentid = auth().currentUser?.uid;
    console.log(currentid);

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
    console.log(data);
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
    } catch (error) {
      console.log(error);
    }
  },
);
export const sendprofilePic = createAsyncThunk(
  'sendPic/Chat',
  async ({userId, ProfileUrl}: {userId: string; ProfileUrl: string}) => {
    console.log();
    try {
      const useRef = firestore().collection('Users').doc(userId);
      await useRef.update({
        profilePic: ProfileUrl,
      });
      return ProfileUrl;
    } catch (error) {
      console.log(error);
    }
  },
);
export const sendstatus = createAsyncThunk(
  'statusUpdate/Chat',
  async ({userId, updatedStatus}: {userId: string; updatedStatus: string}) => {
    console.log();
    try {
      const useRef = firestore().collection('Users').doc(userId);
      await useRef.update({
        status: updatedStatus,
      });
      return updatedStatus;
    } catch (error) {
      console.log(error);
    }
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
      console.log(UpdateUserName);
      await useRef.update({
        UserName: UpdateUserName,
      });
      return UpdateUserName;
    } catch (error) {
      console.log(error);
    }
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
      console.log('updation working fine');
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
      console.log(email);
      await auth().sendPasswordResetEmail(email);
      Alert.alert('email send ');
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        console.log(error.code);
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
  contacts: [],
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
} as signUp;

const authSlice = createSlice({
  name: 'signUp',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    homelistData: (state, action) => {
      state.homeContactData = action.payload;
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
        state.contacts[currentUserId] = currentConteacts;
        state.contacts[otherUserID] = otherContacts;
      })
      .addCase(chatUsers.pending, state => {
        state.loading = true;
      })
      .addCase(chatUsers.fulfilled, (state, action) => {
        state.addUsers = action.payload;
        console.log(state.addUsers);
        state.loading = false;
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
      })
      .addCase(getHomeUsers.fulfilled, (state, action) => {
        state.homedataofUsers = action.payload;
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
export const {resetState, homelistData} = authSlice.actions;
export default authSlice.reducer;

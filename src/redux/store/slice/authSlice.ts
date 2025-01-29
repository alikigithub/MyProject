import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp} from '../../../types/type';
import auth from '@react-native-firebase/auth';
import firestore, {getDocs, Timestamp} from '@react-native-firebase/firestore';
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
      });
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
      return {
        userName: usercredentials.user.displayName,
        UserID: usercredentials.user.uid,
        email: usercredentials.user.email,
      };
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during  log in');
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
    console.log('errr', error);
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
      return {
        currentUserId,
        currentConteacts,
        otherUserID,
        otherContacts,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const chatUsers = createAsyncThunk('chatUsers/chat', async userId => {
  const userDoc = await firestore().collection('Users').doc(userId).get();
  const arrayofIDs = userDoc.data()?.contact;

  const data = await Promise.all(
    arrayofIDs.map(async idData => {
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

  console.log(data);
  return data.filter(user => user !== null);
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

const initialState = {
  username: '',
  password: '',
  email: ' ',
  loading: false,
  userid: '',
  contacts: [],
  profilePic: '',
  searchUser: [],
  addUsers: [],
  searchLoading: false,
} as signUp;

const authSlice = createSlice({
  name: 'signUp',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: builder => {
    builder

      .addCase(signUpUser.pending, state => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userid = action.payload.UserID;
        state.username = action.payload.userName || ' ';
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
      });
  },
});
export const {resetState} = authSlice.actions;
export default authSlice.reducer;

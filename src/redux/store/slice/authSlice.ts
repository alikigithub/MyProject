import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {signUp} from '../../../types/type';
import auth, {
  reauthenticateWithCredential,
  updatePassword,
} from '@react-native-firebase/auth';
import firestore, {collection, getDocs} from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signInWithGoogle = createAsyncThunk('withGoogle', async () => {
  try {
    const google = await GoogleSignin.hasPlayServices();
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
      // If user is new, create a new document with the user data
      await userDocRef.set({
        UserName: fullUser.displayName, // Set the Google username on the first login
        Email: fullUser.email,
        profilePic: fullUser.photoURL, // Set the Google profile picture
        status: '', // Initialize status as empty string
        contact: [],
      });
    } else {
      // If user exists, check if the UserName, profilePic, or status is already set
      const currentUserName = userDoc.data()?.UserName;
      const currentProfilePic = userDoc.data()?.profilePic;
      const currentStatus = userDoc.data()?.status;

      if (!currentUserName) {
        // If no UserName is set (i.e., they haven't changed it manually), update it with the Google displayName
        await userDocRef.update({
          UserName: fullUser.displayName, // Only update if the UserName is empty
        });
      }

      if (!currentProfilePic) {
        // If no profilePic is set (i.e., they haven't set a custom one), update it with the Google photoURL
        await userDocRef.update({
          profilePic: fullUser.photoURL, // Only update if the profilePic is empty
        });
      }

      if (!currentStatus) {
        // If no status is set, update it with an empty string or a default status (if desired)
        await userDocRef.update({
          status: '', // You can replace '' with a default status if needed
        });
      }

      // If the fields are already set, no update is done, and you can print this log
      console.log('UserName, profilePic, or status already set in Firestore');
    }

    Alert.alert('Google Sign-In successful!');
    return {
      UserName: userDoc.data()?.UserName || fullUser.displayName, // Always return the userName from Firestore
      Email: fullUser.email,
      ProfilePic: userDoc.data()?.profilePic || fullUser.photoURL, // Return profilePic from Firestore or Google
      Status: userDoc.data()?.status || '', // Return status from Firestore or empty string
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    Alert.alert('Google Sign-In Error', errorMessage);
  }
});

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
      return {
        UserName: username,
        Email: email,
        contact: [],
        profilePic: '',
        status: '',
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
export const sendprofilePic = createAsyncThunk(
  'sendPic/Chat',
  async ({userId, ProfileUrl}) => {
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
  async ({userId, updatedStatus}) => {
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
  async ({userId, UpdateUserName}) => {
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
  async ({currentPassword, newPassword}) => {
    const current = auth().currentUser;
    try {
      const credential = auth.EmailAuthProvider.credential(
        current?.email,
        currentPassword,
      );
      await reauthenticateWithCredential(current, credential);
      await updatePassword(current, newPassword);
      console.log('updation working fine');
      Alert.alert('Password updated successfully!');
    } catch (error) {
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
  async ({email}) => {
    try {
      console.log(email);
      await auth().sendPasswordResetEmail(email);
      Alert.alert('email send ');
    } catch (error) {
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
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.UserName;
        state.email = action.payload.Email;
        state.profilePic = action.payload.profilePic;
        state.status = action.payload.status;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userid = action.payload.UserID;
        state.username = action.payload.userName;
        state.email = action.payload.email;
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
      .addCase(sendprofilePic.pending, state => {
        state.loading = true;
      })
      .addCase(sendprofilePic.fulfilled, (state, action) => {
        state.profilePic = action.payload;
      })
      .addCase(sendUserNmae.fulfilled, (state, action) => {
        state.username = action.payload;
      })
      .addCase(sendstatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.username = action.payload?.UserName || '';
        state.email = action.payload?.Email || '';
        state.profilePic = action.payload?.ProfilePic || '';
      });
  },
});
export const {resetState} = authSlice.actions;
export default authSlice.reducer;

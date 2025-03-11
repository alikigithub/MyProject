import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {chatTypes} from '../../types/type';

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

const initialState = {
  addUsers: [],
  homeContact: [],
} as chatTypes;
const chatSlice = createSlice({
  name: 'chatUsers',
  initialState: initialState,
  reducers: {
    resetStateAll: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(chatUsers.fulfilled, (state, action) => {
        state.addUsers = action.payload;
      })
      .addCase(homeUsers.fulfilled, (state, action) => {
        state.homeContact = action.payload;
      })
      .addCase(updateContactList.fulfilled, (state, action) => {
        state.homeContact = state.homeContact.filter(
          homedata => homedata !== action.payload,
        );
      });
  },
});
export const {resetStateAll} = chatSlice.actions;
export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  userToken: null,
  senderImage: null,
  senderIdImage: null,
  receiverImage: null,
  receiverIdImage: null,
  email: null,
  phone: null,
  kycStatus: false,
  formSubmitted: false,
  searched: false,
  receipt: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    setSenderImage: (state, action) => {
      state.senderImage = action.payload;
    },
    setSenderIdImage: (state, action) => {
      state.senderIdImage = action.payload;
    },
    setReceiverImage: (state, action) => {
      state.receiverImage = action.payload;
    },
    setReceiverIdImage: (state, action) => {
      state.receiverIdImage = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setKycStatus: (state, action) => {
      state.kycStatus = action.payload;
    },
    setFormSubmitted: (state, action) => {
      state.formSubmitted = action.payload;
    },
    setSearched: (state, action) => {
      state.searched = action.payload;
    },
    setReceipt: (state, action) => {
      state.receipt = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setUser,
  setUserToken,
  setKycStatus,
  setFormSubmitted,
  setReceiverIdImage,
  setReceiverImage,
  setSenderIdImage,
  setSenderImage,
  setSearched,
  setReceipt,
} = userSlice.actions;

export default userSlice.reducer;

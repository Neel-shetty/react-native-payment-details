import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: null,
  userToken: null,
  adhaarFront: null,
  adhaarBack: null,
  panCard: null,
  email: null,
  phone: null,
  kycStatus: false,
  formSubmitted: false,
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
    setAdhaarFront: (state, action) => {
      state.adhaarFront = action.payload;
    },
    setAdhaarBack: (state, action) => {
      state.adhaarBack = action.payload;
    },
    setPanCard: (state, action) => {
      state.panCard = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
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
  },
});

export const {
  setLoggedIn,
  setUser,
  setUserToken,
  setAdhaarFront,
  setAdhaarBack,
  setPanCard,
  setKycStatus,
  setFormSubmitted
} = userSlice.actions;

export default userSlice.reducer;

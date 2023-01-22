import { configureStore } from "@reduxjs/toolkit";
import formErrorSlice from "./slice/formErrorSlice";
import userSlice from "./slice/userSlice";
import PlanSlice from "./slice/PlanSlice";

export const store = configureStore({
  reducer: {
    error: formErrorSlice,
    user: userSlice,
    plan: PlanSlice,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const data = [
  { title: "All", selected: true, key: 1 },
  { title: "Monthly", selected: false, key: 2 },
  { title: "Quarterly", selected: false, key: 3 },
  { title: "Half Yearly", selected: false, key: 4 },
  { title: "Yearly", selected: false, key: 5 },
];

const initialState = {
  selectedCategory: data,
  category: "All",
};

export const PlanSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setSelectedCategory, setCategory } = PlanSlice.actions;

export default PlanSlice.reducer;

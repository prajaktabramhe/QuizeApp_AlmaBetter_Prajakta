import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    clearFullName: (state) => {
      state.fullName = "";
    },
  },
});

export const { setFullName, clearFullName } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categotyID: 0,
  sort: {
    name: 'популярности',
    sortProp: 'rating',
  },
};
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categotyID = action.payload;
    },
  },
});

export const { setCategoryId } = filterSlice.actions;

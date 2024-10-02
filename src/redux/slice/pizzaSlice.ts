import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type FetchPizzasParams = {
  sortBy: string;
  orderBy: string;
  category: string;
  search: string;
  currentPage: number;
};
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async (params: FetchPizzasParams) => {
    const { sortBy, orderBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://66e3eaebd2405277ed125032.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${orderBy}`,
    );

    return data;
  },
);
const initialState = {
  items: [],
  status: '',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        console.log('Fulfilled action payload:', action.payload); // Проверьте, что здесь есть данные
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.error('Error fetching pizzas:', action.error);
        state.status = 'error';
      });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

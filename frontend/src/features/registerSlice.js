import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_API_URL_LOCAL_SERVER, REACT_APP_API_URL_PRODUCTION_SERVER, REACT_APP_ENV_TYPE } = process.env;
const baseURL = REACT_APP_ENV_TYPE === 'production' ? REACT_APP_API_URL_PRODUCTION_SERVER : REACT_APP_API_URL_LOCAL_SERVER;

export const fetchRegister = createAsyncThunk(
  'register/fetchRegister',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/register/registerlist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRegister = createAsyncThunk(
  'register/addRegister',
  async (newContent, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/register/registerSave`, newContent);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editRegister = createAsyncThunk(
  'register/editRegister',
  async (newContent, { rejectWithValue }) => {
    try {

      console.log(newContent);
      const url = window.location.href;
const ids = url.split('/').pop();
console.log(ids);

 //let  id=newContent.id;
    
    const response = await axios.post(`${baseURL}/api/register/editRegister/${ids}`, newContent);
    return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRegister = createAsyncThunk(
  'register/deleteRegister',
  async (id, { rejectWithValue }) => {
    try {
        console.log(id);
     await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    registerList: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // No need for synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registerList = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Similar extraReducers for other async actions
      .addCase(addRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registerList.push(action.payload);
      })
      .addCase(addRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editRegister.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(editRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //console.log(action.payload.data);
        const updatedContentIndex = state.registerList.map(register => register['id']).indexOf(parseInt(action.payload.data.id));
        if (updatedContentIndex !== -1) {
          state.registerList[updatedContentIndex] = action.payload.data;
        }
      })

      .addCase(editRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registerList = state.registerList.filter(register => register.id !== action.payload);
      })
      .addCase(deleteRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;

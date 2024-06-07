import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_API_URL_LOCAL_SERVER, REACT_APP_API_URL_PRODUCTION_SERVER, REACT_APP_ENV_TYPE } = process.env;
const baseURL = REACT_APP_ENV_TYPE === 'production' ? REACT_APP_API_URL_PRODUCTION_SERVER : REACT_APP_API_URL_LOCAL_SERVER;

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/post/pageslist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContent = createAsyncThunk(
  'content/addContent',
  async (newContent, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/post/postSave`, newContent);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editContent = createAsyncThunk(
  'content/editContent',
  async (newContent, { rejectWithValue }) => {
    try {
      const url = window.location.href;
      const ids = url.split('/').pop();


      // Log the FormData contents
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      const response = await axios.post(`${baseURL}/api/post/editPost/${ids}`, newContent);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContent = createAsyncThunk(
  'content/deleteContent',
  async (id, { rejectWithValue }) => {
    try {
        console.log(id);
     await axios.delete(`${baseURL}/api/post/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    contentList: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // No need for synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contentList = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Similar extraReducers for other async actions
      .addCase(addContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contentList.push(action.payload.data);
      })
      .addCase(addContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedContentIndex = state.contentList.findIndex(content => content.id === action.payload.data.id);
        if (updatedContentIndex !== -1) {
          state.contentList[updatedContentIndex] = action.payload.data;
        }
      })
      .addCase(editContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contentList = state.contentList.filter(content => content.id !== action.payload);
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;

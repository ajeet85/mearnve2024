import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_API_URL_LOCAL_SERVER, REACT_APP_API_URL_PRODUCTION_SERVER, REACT_APP_ENV_TYPE } = process.env;
const baseURL = REACT_APP_ENV_TYPE === 'production' ? REACT_APP_API_URL_PRODUCTION_SERVER : REACT_APP_API_URL_LOCAL_SERVER;


export const fetchcallRequest = createAsyncThunk(
  'callrequest/fetchcallRequest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/callrequest/callbacklist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addcallRequest = createAsyncThunk(
  'callrequest/addcallRequest',
  async (newContent, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/callrequest/callrecordSave`, newContent);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editcallRequest = createAsyncThunk(
  'callrequest/editcallRequest',
  async (newContent, { rejectWithValue }) => {
    try {

     // console.log(newContent);
      const url = window.location.href;
const ids = url.split('/').pop();
//console.log(ids);

 //let  id=newContent.id;
    
    const response = await axios.post(`${baseURL}/api/callrequest/editcallRequest/${ids}`, newContent);
    return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletecallRequest = createAsyncThunk(
  'callrequest/deletecallRequest',
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

const callrequestSlice = createSlice({
  name: 'callrequest',
  initialState: {
    callrequestList: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // No need for synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcallRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchcallRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.callrequestList = action.payload;
      })
      .addCase(fetchcallRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Similar extraReducers for other async actions
      .addCase(addcallRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addcallRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.callrequestList.push(action.payload);
      })
      .addCase(addcallRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editcallRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editcallRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //console.log(action.payload.data);
        const updatedContentIndex = state.callrequestList.map(callrequest => callrequest['id']).indexOf(parseInt(action.payload.data.id));
        if (updatedContentIndex !== -1) {
          state.callrequestList[updatedContentIndex] = action.payload.data;
        }
      })
      .addCase(editcallRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deletecallRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletecallRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.callrequestList = state.callrequestList.filter(callrequest => callrequest.id !== action.payload);
      })
      .addCase(deletecallRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default callrequestSlice.reducer;

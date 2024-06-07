import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import subscriptionReducer from './subscriptionSlice';
import homeSliceReduser from './homeSlice';
import registerSlice from './registerSlice';
import callrequestSliceReducer from './callrequestSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    subscripton: subscriptionReducer,
    home : homeSliceReduser,
    register : registerSlice,
    callrequest:callrequestSliceReducer,


  },
});

export default store;
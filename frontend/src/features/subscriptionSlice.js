import { createSlice } from '@reduxjs/toolkit';

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSubscription(state, action) {
      state.subscriptions.push(action.payload);
    },
    removeSubscription(state, action) {
      state.subscriptions = state.subscriptions.filter(subscription => subscription.id !== action.payload);
    },    
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setSubscriptions(state, action) {
      state.subscriptions = action.payload;
    }
  },
});

export const { addSubscription, removeSubscription, setLoading, setError, clearError ,setSubscriptions} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
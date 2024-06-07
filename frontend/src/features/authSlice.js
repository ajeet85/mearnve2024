import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token:null,
  error: null,
};

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadStateFromLocalStorage(),
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.userdata;
      state.error = null;
      state.token = action.payload.token;
      localStorage.setItem('authState', JSON.stringify(state));
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure(state, action) {
      localStorage.removeItem('authState');
      localStorage.removeItem('token');
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      state.token = null;
    },
    logout(state) {
      localStorage.removeItem('authState');
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

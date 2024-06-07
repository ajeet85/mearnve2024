import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../features/authSlice';

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        
        const checkAuth = async () => {
            try {
                await axios.post('/api/users/userlist');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    dispatch(logout());
                    navigate('/admin/login');
                } else {
                    console.error("An error occurred:", error);
                }
            }
        };

        checkAuth();
    }, [dispatch, navigate]);

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;

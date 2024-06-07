import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from './../../features/authSlice';
import { useNavigate,Link } from 'react-router-dom'
import toast from 'react-hot-toast';


export default function AdminLogin() {
       const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    
    useEffect(() => {
        if (isAuthenticated) {
           navigate('/admin/dashboard');
        }
    }, [navigate,isAuthenticated]);

    const handleLogin = async (e) => {
      e.preventDefault();
      dispatch(loginStart());
      try {
            const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
           
            //console.log(data);
           



            if (data.success === true) {
                dispatch(loginSuccess(data));
                navigate('/admin/dashboard');
              } else {
                dispatch(loginFailure(data['errors'][0].msg));
                // Show error toast
                toast.error(data['errors'][0].msg);
              }
        } catch (err) {
            dispatch(loginFailure(err.message));
             // Show error toast
             toast.error(err.message);
        }
        };

  return (
    <div className='adminApp'>
        <div className="bg-primary">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-1">Login</h3></div>
                            <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-floating mb-3">
                                <input className="form-control" type="email" placeholder="name@example.com"  value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <label htmlFor="inputEmail">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                <input className="form-control" id="inputPassword" type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label htmlFor="inputPassword">Password</label>
                                </div>
                                <div className="form-check mb-3">
                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" defaultValue />
                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                <Link className="small" to="#">Forgot Password?</Link>
                                <button type="submit" disabled={isLoading} className='btn btn-primary'>
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                                </div>
                                
                            </form>
                            </div>
                            {/* <div className="card-footer text-center py-3">
                                <div className="small"><Link to="/register.html">Need an account? Sign up!</Link></div>
                            </div> */}
                        </div>
                        </div>
                    </div>
                    </div>
                </main>
                </div>
                <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright © Gii Finance Network 2024</div>
                        <div>
                        <Link to="/#">Privacy Policy</Link>
                        <Link to="/#">Terms &amp; Conditions</Link>
                        </div>
                    </div>
                    </div>
                </footer>
                </div>
            </div>
        </div>
    </div>                  
  )
}

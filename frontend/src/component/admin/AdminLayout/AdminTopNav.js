import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/authSlice';

export default function AdminTopNav() {
   const dispatch = useDispatch();
   const navigate  = useNavigate();

   const handleLogout = () => {
      dispatch(logout());
      navigate('/admin/login');
   };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
         {/* Navbar Brand*/}
         <Link className="navbar-brand ps-3" to="/admin/dashboard">
         Gii Finance Network</Link>
         {/* Sidebar Toggle*/}
         <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fa fa-bars" /></button>

         {/* Navbar Search*/}
         <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            
         </form>
         {/* Navbar*/}
         <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
               <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <i className="fa fa-user fa-fw" /></Link>
               <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                     <Link className="dropdown-item" to="#!">
                     Settings</Link>
                  </li>
                  <li>
                     <Link className="dropdown-item" to="#!">
                     Activity Log</Link>
                  </li>
                  <li>
                     <hr className="dropdown-divider" />
                  </li>
                  <li>
                    
                     <button className="dropdown-item"  onClick={handleLogout}>Logout</button>

                  </li>
               </ul>
            </li>
         </ul>
      </nav>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function AdminSidenav() {
  const user = useSelector((state) => state.auth.user);

     const url = window.location.href;
   
     // Split the URL by '/'
      const segments = url.split('/');
      const adminIndex = segments.indexOf('admin');

// Get the parameter after 'admin'
const currentMenu = segments[adminIndex + 1];
 
const menuActive =[
   'dashboard',
   'user','user-add','user-edit',
   'subscription','subscription-add','subscription-edit',
   'page','page-add','page-edit',
   'register','register-edit',
   'request-callback','request-callback-edit'
   ];
let menuActiveindex = menuActive.findIndex(x => x === currentMenu); 


  return (
    <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
               <div className="sb-sidenav-menu mt-4">
                  <div className="nav">
                     
                     <Link className={(menuActiveindex === 0) ? "nav-link active" : "nav-link"} to="/admin/dashboard">
                     <div className="sb-nav-link-icon"><i className="fa fa-dashboard" /></div>
                     Dashboard
                     </Link>

                     <Link className={(menuActiveindex === 1 || menuActiveindex === 2 || menuActiveindex === 3) ? "nav-link active" : "nav-link collapsed"} to="#" data-bs-toggle="collapse" data-bs-target="#collapseUser" aria-expanded="false" aria-controls="collapseUser">
                     <div className="sb-nav-link-icon"><i className="fa fa-users" /></div>
                      Users
                     <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                     </Link>
                     <div className={(menuActiveindex === 1 || menuActiveindex === 2 || menuActiveindex === 3) ? "collapse show" : "collapse"} id="collapseUser" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                           <Link className={(menuActiveindex === 2 ) ? "nav-link active" : "nav-link"} to="/admin/user-add">
                           Add User</Link>
                           <Link  className={(menuActiveindex === 1) ? "nav-link active" : "nav-link"}  to="/admin/user">
                           Manage Users</Link>
                        </nav>
                     </div>

                     <Link className={(menuActiveindex === 4 || menuActiveindex === 5 || menuActiveindex === 6) ? "nav-link active" : "nav-link collapsed"}  to="#" data-bs-toggle="collapse" data-bs-target="#collapsesubscription" aria-expanded="false" aria-controls="collapsesubscription">
                     <div className="sb-nav-link-icon"><i className="fa fa-newspaper-o" /></div>
                      Subscription
                     <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                     </Link>
                     <div className={(menuActiveindex === 4 || menuActiveindex === 5 || menuActiveindex === 6) ? "collapse show active" : "collapse"} id="collapsesubscription" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                           <Link className={(menuActiveindex === 5 ) ? "nav-link active" : "nav-link"} to="/admin/subscription-add">
                           Add Subscription</Link>
                           <Link className={(menuActiveindex === 4 ) ? "nav-link active" : "nav-link"} to="/admin/subscription">
                           Manage Subscriptions</Link>
                        </nav>
                     </div>

                     <Link  className={(menuActiveindex === 7 || menuActiveindex === 8 || menuActiveindex === 9) ? "nav-link active" : "nav-link collapsed"}  to="#" data-bs-toggle="collapse" data-bs-target="#collapsePage" aria-expanded="false" aria-controls="collapsePage">
                     <div className="sb-nav-link-icon"><i className="fa fa-image" /></div>
                      Page
                     <div className="sb-sidenav-collapse-arrow"><i className="fa fa-angle-down" /></div>
                     </Link>
                     <div className={(menuActiveindex === 7 || menuActiveindex === 8 || menuActiveindex === 9) ? "collapse show active" : "collapse"} id="collapsePage" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                           <Link className={(menuActiveindex === 8 ) ? "nav-link active" : "nav-link"}  to="/admin/page-add">
                           Add Page</Link>
                           <Link className={(menuActiveindex === 7 ) ? "nav-link active" : "nav-link"}  to="/admin/page">
                           Manage Pages</Link>
                        </nav>
                     </div>

                     <Link className={(menuActiveindex === 10 || menuActiveindex === 11) ? "nav-link active" : "nav-link"} to="/admin/register">
                     <div className="sb-nav-link-icon"><i className="fa fa-user" /></div>
                     Register Data
                     </Link>

                     <Link className={(menuActiveindex === 12 || menuActiveindex === 13) ? "nav-link active" : "nav-link"} to="/admin/request-callback">
                     <div className="sb-nav-link-icon"><i className="fa fa-list" /></div>
                     Request Callback
                     </Link>
                    

                  </div>
               </div>
               <div className="sb-sidenav-footer">
                  <div className="small">Logged in as:</div>
                  {user ? (
                  <>
                     {user.name}
                  </> ) : (
                  <>User not logged in</>
                  )}
               </div>
            </nav>
         </div>
  )
}
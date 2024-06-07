import React from 'react'
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { Toaster  } from 'react-hot-toast';

import HomePage from './component/Index';
import Productoverview from './component/Productoverview';
import BuyerProduct from './component/BuyerProduct';
import SupplierProduct from './component/SupplierProduct';
import CustomFinance from './component/CustomFinance';
import Benefit from './component/Benefit';
import About from './component/About';
import Register from './component/Register';
import Signin from './component/Signin';

import Termsofuse from './component/Termsofuse';
import Privacy from './component/Privacy';
import Cookies from './component/Cookies';
import Acceptableuse from './component/Acceptableuse';

import AdminLogin from './component/admin/AdminLogin';
import Dashboard from './component/admin/Dashboard';

import UserAdd from './component/admin/User/UserAdd';
import UserEdit from './component/admin/User/UserEdit';
import UserList from './component/admin/User/UserList';

import SubscriptionAdd from './component/admin/Subscription/SubscriptionAdd';
import SubscriptionEdit from './component/admin/Subscription/SubscriptionEdit';
import SubscriptionList from './component/admin/Subscription/SubscriptionList';


import PageAdd from './component/admin/Pages/PageAdd';
import PageEdit from './component/admin/Pages/PageEdit';
import PageList from './component/admin/Pages/PageList';

import RegisterEdit from './component/admin/Register/RegisterEdit';
import RegisterList from './component/admin/Register/RegisterList';

import PrivateRoute from './routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';


import { useSelector } from 'react-redux';
import HomeComponent from './component/Home';
import EditHome from './component/EditHome';
import AddHome from './component/AddHome';
import TextEditorWithForm from './component/TextEditorWithForm';

import CallrequestList from './component/admin/Callrequest/CallrequestList';
import CallrequestEdit from './component/admin/Callrequest/CallrequestEdit';


const Routing = () => {

  const token = useSelector((state) => state.auth.token);
  if(token){
    setAuthToken(token);
  }

  return (
    <>
    <Toaster  position="top-right" />
    <Router>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/product/overview" element={<Productoverview />} />
         <Route path="/product/buyer-product" element={<BuyerProduct />} />
         <Route path="/product/supplier-products" element={<SupplierProduct />} />
         <Route path="/product/custom-finance" element={<CustomFinance />} />

         <Route path="/benefits" element={<BenefitRouter />} />
         <Route path="/about" element={<AboutRouter />} />
         <Route path="/register" element={<Register />} />
         <Route path="/sign-in" element={<Signin />} />

         <Route path="/terms-of-use" element={<Termsofuse />} />
         <Route path="/acceptable-use" element={<Acceptableuse />} />
         <Route path="/privacy" element={<Privacy />} />
         <Route path="/cookies" element={<Cookies />} />

         <Route path="/admin/login" element={<AdminLogin />} />
         
         <Route path="/homein" element={<HomeComponent />} />
         <Route  path="/homein/adddata" element={<AddHome />} />
         <Route  path="/homein/:id" element={<EditHome />} />
         <Route path="/editor" element={<TextEditorWithForm />} />
         
         
         <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user" element={<UserList />} />
          <Route path="/admin/user-add" element={<UserAdd />} />
          <Route path="/admin/user-edit/:id" element={<UserEdit />} />

          <Route path="/admin/subscription" element={<SubscriptionList />} />
          <Route path="/admin/subscription-add" element={<SubscriptionAdd />} />
          <Route path="/admin/subscription-edit/:id" element={<SubscriptionEdit />} />

          <Route path="/admin/page" element={<PageList />} />
          <Route path="/admin/page-add" element={<PageAdd />} />
          <Route path="/admin/page-edit/:id" element={<PageEdit />} />

          <Route path="/admin/register" element={<RegisterList />} />
          <Route path="/admin/register-edit/:id" element={<RegisterEdit />} />

          <Route path="/admin/request-callback" element={<CallrequestList />} />
          <Route path="/admin/request-callback-edit/:id" element={<CallrequestEdit />} />

        </Route>

         
       </Routes>
     </Router>
     </>
  )
}

function BenefitRouter() {
 
  const [searchParams] = useSearchParams();
  const gktab = searchParams.get('gktab');

  switch (gktab) {
    case '1':
      return <Benefit1 />;
    case '2':
      return <Benefit2 />;
    case '3':
      return <Benefit3 />;
    case '4':
        return <Benefit4 />;
    default:
      return false;
  }
}

function Benefit1() {
  return <Benefit gktab="1" />;
}

function Benefit2() {
  return <Benefit gktab="2" />;
}

function Benefit3() {
  return <Benefit gktab="3" />;
}

function Benefit4() {
  return <Benefit gktab="4" />;
}


function AboutRouter() {
  const [searchParams] = useSearchParams();
  const gktab = searchParams.get('gktab');

  switch (gktab) {
    case '1':
      return <About1 />;
    case '2':
      return <About2 />;
    case '3':
      return <About3 />;
    default:
      return false;
  }
}

function About1() {
  return <About gktab="1" />;
}

function About2() {
  return <About gktab="2" />;
}

function About3() {
  return <About gktab="3" />;
}


function App() {

  return (
    <div>
     <Routing />
   </div>
  );
}

export default App;

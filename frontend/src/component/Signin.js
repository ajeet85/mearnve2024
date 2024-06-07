import React, { useEffect, useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



export default function Signin() {
  const [postData, setPostData] = useState(null);

  const contentList = useSelector(state => state.home.contentList);

  useEffect(() => {
    const singleContent = contentList.find((ele) => ele.menu === 'signin');
    setPostData(singleContent);
  }, [contentList]);



  function removeExtraSpaces(htmlContent) {
    return htmlContent.replace(/&nbsp;+/g, ' ');
  }

  return (
    <div className='websiteApp'>
      <Header></Header>
        {/* banner section start here */}
         {postData && (
                  <>
      <section className="banner-section" style={{background: `url(${'/uploads/'+postData.image}) no-repeat`}}>
                    <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section) }} />
                  </section>

      </>
     )}
        {/* banner section end here */}
        {/* content section start here */}
        <section className="content-section">  
          <div className="container">    
            <div className="row">
              <div className="col-md-12">
                <div className="register-form-section">
                  <div className="register-form-row">
                    <div className="register-form-left">Username</div>
                    <div className="register-form-right"><input type="text" name="first-name" /></div>
                  </div>
                  <div className="register-form-row">
                    <div className="register-form-left">Password</div>
                    <div className="register-form-right"><input type="text" name="last-name" /></div>
                  </div>
                  <div className="register-form-row">
                    <div className="register-form-left">Validation</div>
                    <div className="register-form-right"><input type="text" name="Company" /></div>
                  </div>          
                  <div className="register-form-row">
                    <div className="register-form-left"><button name="submit" className="submit-button">Submit</button></div>
                    <div className="register-form-right">&nbsp;</div>
                  </div>        
                </div>
              </div> 
              <div className="col-md-12">
                <ul className="sign-in-link">
                  <li><Link to="#">Forgot Your Password?</Link></li>
                  <li><Link to="#">Forgot Your Username?</Link></li>
                </ul>
              </div>           
            </div>
          </div>
        </section>
        {/* content section end here */}
      <Footer></Footer>
    </div>
  )
}

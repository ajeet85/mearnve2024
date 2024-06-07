import React, { useEffect, useState } from 'react';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { useSelector } from 'react-redux';
import CallbackRequest from './Callbackrequest';



export default function CustomFinance() {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState(null);

  const contentList = useSelector(state => state.home.contentList);

  useEffect(() => {
    const singleContent = contentList.find((ele) => ele.menu === 'custom_finance');
    setPostData(singleContent);
  }, [contentList]);

 
  function removeExtraSpaces(htmlContent) {
    return htmlContent.replace(/&nbsp;+/g, ' ');
  }

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className='websiteApp'>
     
     <Header></Header>
     
     {postData && (
                  <>
                  <section className="banner-section" style={{background: `url(${'/uploads/'+postData.image})`}}>
                    <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section) }} />
                  </section>
      
                <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section2) }} />

               

                <section className="content-section">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="request-call-back-wrapper">
                          <p>Need more information?</p>
                      
                          {/* Popup section start here */}          
                          {/* Modal */}
                          <button className="request-call-button" onClick={handleModalOpen}>Request a callback</button>
                          <CallbackRequest showModal={showModal} handleClose={handleModalClose}  />
                              
                          {/* Popup section start here */}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                
      </>
     )}
      <Footer></Footer>
    </div>
  )
}

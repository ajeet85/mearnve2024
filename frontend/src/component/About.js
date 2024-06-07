import React, { useEffect, useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CallbackRequest from './Callbackrequest';

export default function Benefit({ gktab }) {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState(null);

  const contentList = useSelector(state => state.home.contentList);

  useEffect(() => {
    const singleContent = contentList.find((ele) => ele.menu === 'about');
    setPostData(singleContent);
  }, [contentList]);



  function removeExtraSpaces(htmlContent) {
    return htmlContent.replace(/&nbsp;+/g, ' ');
  }

  const backgroundImage = postData?.image ? `/uploads/${postData.image}` : null;
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className='websiteApp'>
      <Header></Header>
      
        {/* banner section start here */}
        <section className="banner-section mobile-banner" style={{
                    background: backgroundImage ? `url(${backgroundImage}) no-repeat` : 'none',
                    height: '400px',
                }}
      >
          <div className="container">    
          </div>
        </section>
        {/* banner section end here */}
        {/* content section start here */}
        <section className="tabs-section about-tab-wrapper">  
          <div className="container">  
            <ul className="nav nav-tabs">
              <li className={gktab === '1' ? 'active' : ''}><Link to="?gktab=1" className="what-provide-icon">What We Provide</Link></li>
              <li className={gktab === '2' ? 'active' : ''}><Link to="?gktab=2" className="why-gii-icon">Why Gii</Link></li>    
              <li className={gktab === '3' ? 'active' : ''}><Link to="?gktab=3" className="how-work-icon">How we work</Link></li>        
            </ul>
          </div>
          <div className="tab-content">
            <div id="tab-one" className={`tab-pane ${gktab === '1' ? 'in active' : ''}`}>
              {postData && (
                        <>
                         <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section) }} />
                        </>
                        )}
            </div>
            <div id="tab-two" className={`tab-pane fade ${gktab === '2' ? 'in active' : ''}`}>
                {postData && (
                        <>
                         <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section2) }} />
                        </>
                        )}
             
            </div> 
            <div id="tab-three" className={`tab-pane fade ${gktab === '3' ? 'in active' : ''}`}>
              {postData && (
                        <>
                         <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section3) }} />
                        </>
                        )}
            </div>
          </div>
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
        </section>
        {/* content section end here */}

      <Footer></Footer>
    </div>
  )
}
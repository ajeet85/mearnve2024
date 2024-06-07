import React, { useEffect, useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CallbackRequest from './Callbackrequest';


export default function SupplierProduct() {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('tab-one');
    const isActiveTab = (tabId) => {
    return activeTab === tabId;
    };
    const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    };

    const [postData, setPostData] = useState(null);
    const contentList = useSelector(state => state.home.contentList);

    useEffect(() => {
      const singleContent = contentList.find((ele) => ele.menu === 'supplier_products');
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
            <section className="tabs-section buyer-product-tab-wrapper">
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className={isActiveTab('tab-one') ? 'active' : ''}>
                            <Link onClick={() => handleTabClick('tab-one')} className="reverse-tab-icon">Invoice Discounting</Link>
                        </li>
                        <li className={isActiveTab('tab-two') ? 'active' : ''}>
                            <Link onClick={() => handleTabClick('tab-two')} className="dynamic-discount-tab-icon">Invoice Factoring</Link>
                        </li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div id="tab-one" className={`tab-pane ${isActiveTab('tab-one') ? 'in active' : 'fade'}`}>
                    
                    {postData && (
                        <>
                         <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section) }} />
                        </>
                        )}

                    </div>
                    <div id="tab-two" className={`tab-pane ${isActiveTab('tab-two') ? 'in active' : 'fade'}`}>
                    {postData && (
                        <>
                        <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section2) }} />

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
            
        <Footer></Footer>
    </div>
  )
}

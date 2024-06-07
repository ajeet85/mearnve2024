import React, { useEffect, useState } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { useSelector } from 'react-redux';

export default function Cookies() {
  const [postData, setPostData] = useState(null);

  const contentList = useSelector(state => state.home.contentList);

  useEffect(() => {
    const singleContent = contentList.find((ele) => ele.menu === 'cookies');
    setPostData(singleContent);
  }, [contentList]);

   function removeExtraSpaces(htmlContent) {
    return htmlContent.replace(/&nbsp;+/g, ' ');
  }
  return (
    <div className='websiteApp'>
        <Header></Header>
        {postData && (
                        <>
                        <section className="banner-section" style={{background: `url(${'/uploads/'+postData.image}) no-repeat`}}>
                    <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section) }} />
                  </section>
                         <div dangerouslySetInnerHTML={{ __html: removeExtraSpaces(postData.content_section2) }} />
                        </>
                        )}
        <Footer></Footer>
      </div>
  )
}
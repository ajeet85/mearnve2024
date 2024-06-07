import React from 'react'
import { Link } from 'react-router-dom'
import Subscription from '../Subscription';

export default function Footer() {
  return (
    <footer>
        <div className="footer-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">        
                <div className="footer-info">
                  <h4>Stay in touch</h4>
                  <p>GII FINANCE NETWORK LIMITED</p>
                  <p>20 ST DUNSTAN'S HILL</p>
                  <p>LONDON EC3R 8HL</p>
                  <p>UNITED KINGDOM</p>
                  <p className="telephone">T: +44 (0) 2078594742</p>
                  <p>E: contact@giifinance.com</p>
                  <p>&nbsp;</p>
                  <p>Business Hours: 09:00-17:00 GMT</p>
                  <p>(excluding UK public holidays)</p> 
                </div>
              </div>      
              <div className="col-md-4">
                <div className="footer-info">
                  <h4>Important Information</h4>
                  <div className="footer-quick-link">            
                    <ul>
                      <li><Link to="/terms-of-use">Terms of Use</Link></li>
                      <li><Link to="/acceptable-use">Acceptable Use</Link></li>
                      <li><Link to="/privacy">Privacy</Link></li>
                      <li><Link to="/cookies">Cookies</Link></li>
                    </ul>
                  </div>
                </div>        
              </div>
              <div className="col-md-4">
                <div className="footer-info padding-bottom-none">
                  <h4>Social Links</h4>
                  <div className="footer-social">                       
                    <ul>
                      <li><Link to="https://twitter.com/giifinance" target="_blank"><i className="fa fa-twitter" aria-hidden="true" /></Link></li>              
                      <li><Link to="https://www.linkedin.com/company/gii-finance-network" target="_blank"><i className="fa fa-linkedin" aria-hidden="true" /></Link></li>
                      <li><Link to="https://plus.google.com/106079707548886267822" target="_blank"><i className="fa fa-google-plus" aria-hidden="true" /></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="footer-info">
                  <h4>Subscribe to our Newsletter</h4>
                  <Subscription />
                </div>        
              </div>
            </div>
            <div className="row footer-copyright">
              <div className="col-md-12"><p>© Gii Finance Network. All rights reserved.</p></div>
            </div> 
          </div>  
        </div>
    </footer>
  )
}

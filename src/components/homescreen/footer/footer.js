import React from 'react';
import './footer.css';

const Footer=()=>{
    return(
        <div className="footer-container">
            <div className="footer-content">
                <h3>
                    CONTACT US 
                </h3>
                <span>
                    Mob no: +91 9188229492
                </span>
                <span>
                    Email : reqm.support@gmail.com
                </span>
            </div>
            <div  className="footer-content">
                <h3>
                    CUSTOMER SERVICE 
                </h3>
                <span>
                    Pricing and Payment 
                </span>
                <span>
                    Refund Policy 
                </span>
                <span>
                    Consultation booking 
                </span>
                <span>
                    FAQ
                </span>
            </div>
            <div  className="footer-content">
                <h3>
                    INFORMATION
                </h3>
                <span>
                    About ReqM
                </span>
                <span>
                    Privacy Policy
                </span>
                <span>
                    Terms and Conditions
                </span>
                <span>
                    Press Enquiries
                </span>
            </div>
            <div  className="footer-content">
                <h3>
                    BLOG SUBSCRIPTION
                </h3>
                <span>
                    Subcribe to our blog 
                </span>
            </div>
        </div>
    );
}

export default Footer;
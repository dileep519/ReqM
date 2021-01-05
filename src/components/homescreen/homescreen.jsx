import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';
import './homescreen.css';
import image1 from '../../shared/images/Rectangle 159.png';
import image2 from '../../shared/images/Rectangle 163.png';
import image3 from '../../shared/images/Rectangle 165.png';
import image4 from '../../shared/images/Rectangle 166.png';



const HomeScreen=(props)=>{
    return(
        <div className="homescreen-container">
            <Header/>
            <div className="homescreen-body-conatiner1">
                <div className="homescreen-text">
                    <div>Collect your product requirements and keep track of your project with ease</div>
                    <div className="get-started">Get started</div>
                </div>
                <div className="homescreen-image">
                    <img src={image1} />
                </div>
            </div>
            <div className="homescreen-body-conatiner2">
                    <div className="homescreen-text2">
                        <span className="heading-container2">
                            Collect and organise your Requirements
                        </span>
                        <span>
                            -Within a uniform format
                        </span>
                        <span>
                            -By Classification Type (new or existing enhancement) within project(s) 
                        </span>
                        <span>
                            -By mode of recepient(Offline/Online).
                        </span>
                    </div>
                    <div className="homescreen-image2">
                        <img src={image2}/>
                    </div>
            </div>
            <div className="homescreen-body-conatiner3">
                <div className="homescren-image3">
                    <img src={image3}/>
                </div>
                <div className="homescreen-text3">
                    <span className="heading-container2">
                        Provides an overall snapshot of requirement statistics 
                    </span><br/>
                    <span>
                        Prioritize your projects accordingly and easily keep track of each of its progress
                    </span> 
                </div>
            </div>
            <div className="homescreen-body-conatiner4">
                <div className="homescreen-text4">
                    <span className="heading-container2">
                    Collaborate with other stakeholders for sharing/editing requirements 
                    </span>
                    <span>
                    Integrated with slack/Gmail for easy sharing of requirement
                    </span> 
                </div>
                <div className="homescren-image4">
                    <img src={image4}/>
                </div>
            </div>
            {/*  Integrated with slack/Gmail for easy sharing of requirement */}
            <Footer/>
        </div>
    );
}

export default HomeScreen;
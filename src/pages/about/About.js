import { Col } from 'antd';
import React from 'react'
import "./about-styles.css";

function About() {
    return (
        <div>
            <div className="bluefield" />
            <div className="whitefield" />

            <div className="mainContent">
                <h1 className="header">OUR STORY</h1>
                <h1>Based in florida with clients & team members all over the globe ! </h1>
                <img className="people" src="people.png" />
                <Col span={12} offset={6}> Mailchimp is an all-in-one Marketing Platform for small business. We Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum </Col>
            </div>
        </div>
    )
}



export default About

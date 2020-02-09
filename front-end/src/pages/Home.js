import React, {useState, useEffect} from 'react'
import '../App.css'
import Footer from '../pageComponents/Footer'

export default function  Home() {

    return (
        <div>
        <div className='content-section container'>
            <h1 className='section-header'>Welcom to Fortnite Online Shop</h1>
            <h3>We sell in-game items at exclusively discouted prices. They are only available at a limited amount of time, so act fast!</h3>
            <h3>The items are updated everyday.</h3>
            <img src="https://see.news/wp-content/uploads/2019/07/H2x1_NSwitchDS_Fortnite_image1600w.jpg" />
            </div>
            
            <Footer />
            
        </div>
    )
}

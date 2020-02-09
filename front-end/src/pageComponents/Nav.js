import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'

export default function Nav() {
    const navStyle = {color: 'black', textDecoration: 'none', fontWeight: 'bold'}
    const logo = {width: '100px'}
    return (
        <nav>
            <img  style={logo} src='http://pngimg.com/uploads/fortnite/fortnite_PNG158.png' />
            <ul className='nav nav-links'>
                <Link style={navStyle} to='/'>
                <li>Home</li>
                </Link>

                <Link style={navStyle} to='/about'>
                <li>About</li>
                </Link>

                <Link style={navStyle} to='/shop'>
                <li>Shop</li>
                </Link>
                
            </ul>
        </nav>
    )
}

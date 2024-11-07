import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import logo from './Sun_Store.png'


const Header = ({title}) => {
    
    return(
        <div className='Header'>
            <div  className='title'>{<img id="logo"src={ logo }/>}</div>
            <div className='nav-container'>
                <NavLink className='nav' to='/Home'>Home</NavLink>
                <NavLink className='nav' to='/Product'>Product</NavLink>
                <NavLink className='nav' to='/Category'>Category</NavLink>
                <NavLink className='nav' to='/History'>History</NavLink>
            </div>
        </div>
    )
}

export default Header
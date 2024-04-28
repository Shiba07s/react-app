import React from 'react'
import { FaUserCircle,FaSearch,FaAlignJustify, FaEnvelope } from 'react-icons/fa';


function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            {/* <faJustify className='icon' onClick={OpenSidebar}/> */}
            <FaAlignJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            {/* <faSearch  className='icon'/> */}
            {/* <FaSearch className='icon'/> */}
        </div>
        <div className='header-right'>
            {/* <faFillBellFill className='icon'/> */}
            {/* <FaEnvelope className='icon'/> */}
            <FaUserCircle className='icon'/>
        </div>
    </header>
  )
}

export default Header
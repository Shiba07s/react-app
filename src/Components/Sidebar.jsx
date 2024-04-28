import React from 'react'

import{useNavigate } from 'react-router-dom'


// {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
//   BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
//  from 'react-icons/fa';

import { FaCartArrowDown, FaTh, FaArchive, FaUsers, FaList} from 'react-icons/fa';




function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <FaCartArrowDown  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/homepage">
                    <FaTh className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/get-transaction">
                    <FaArchive className='icon'/> Gate-Keeper
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href=" ">
                    <FaTh className='icon'/> Quality-Check
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/setup">
                    <FaUsers className='icon'/> Setup
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/gate-user">
                    <FaList className='icon'/> Inventory
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li> */}
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li> */}
        </ul>
    </aside>
  )
}

export default Sidebar
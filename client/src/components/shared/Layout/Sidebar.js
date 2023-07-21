import React from 'react'
import { userMenu } from './Menus/userMenu'
import { useLocation,Link } from 'react-router-dom'
const Sidebar = () => {
  const location =useLocation();
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
            {userMenu.map((menu)=>{
                const isactive= location.pathname === menu.path
                return(
                    <div className={` menu-item ${isactive && 'active'}`}>
                      <i className={menu.icon} > </i>
                      <Link to={menu.path}>{ menu.name}</Link>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

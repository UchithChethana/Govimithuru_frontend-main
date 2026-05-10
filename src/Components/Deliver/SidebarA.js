import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Sidebar.css';

function SidebarA() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/delivery" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="" activeClassName="active-link">
            Alert
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/driver" activeClassName="active-link">
            Drivers List
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/deliverySumery" activeClassName="active-link">
            Deliver Summary
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/showcase" activeClassName="active-link">
            
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/alerts" activeClassName="active-link">
           
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarA;

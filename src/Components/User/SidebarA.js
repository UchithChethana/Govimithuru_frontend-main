import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Sidebar.css';

function SidebarA() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/customers" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/USerSummery" activeClassName="active-link">
            Summery
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/user/review" activeClassName="active-link">
           Reviews
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory/all" activeClassName="active-link">
           
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

import React from 'react';
import { NavLink } from 'react-router-dom';
import './css/Sidebar.css';

function SidebarA() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/inventory" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/Alert" activeClassName="active-link">
            Alert
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/sales" activeClassName="active-link">
            Sales
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory/supply-form" activeClassName="active-link">
            Supply Item
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory/all" activeClassName="active-link">
            Supply Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/showcase" activeClassName="active-link">
            Showcase
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/offer" activeClassName="active-link">
            Offer
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/cropsolution" activeClassName="active-link">
            Crop Solution
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/bestseller" activeClassName="active-link">
            Best Seller
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/SummeryInventory" activeClassName="active-link">
            Category Summary
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SidebarA;

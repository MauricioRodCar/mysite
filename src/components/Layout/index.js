import React from 'react';
import SideBar from '../Sidebar';

const Layout = ({ children }) => (
  <>
    <SideBar/>
    {children}
  </>
);

export default Layout;

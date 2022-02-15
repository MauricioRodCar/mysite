import React from 'react';
import SideBar from '../Sidebar';
import Networks from '../Networks';

const Layout = ({ children }) => (
  <>
    <SideBar/>
    {children}
    <Networks/>
  </>
);

export default Layout;

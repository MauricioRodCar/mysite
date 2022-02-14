import React from 'react';
import './container.css';

const Container = ({ children, title }) => (
  <div className="container">
    <h1 className="container-title">{title}</h1>
    {children}
  </div>
);

export default Container;

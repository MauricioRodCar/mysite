import {useState, useEffect} from 'react';

const ShopSidebar = ({categories, handleSelectCategory}) => {

  return (
    <div className="shop-sidebar">
    <p className="sidebar-category category-all" onClick={()=>{handleSelectCategory("")}}>
        All products
    </p>
    {
      categories.map((category, index) =>
          <p className="sidebar-category" onClick={()=>{handleSelectCategory(category)}}>
              {category}
          </p>
      )
    }
    </div>
  )
}

export default ShopSidebar;

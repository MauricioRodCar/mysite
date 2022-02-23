import {useState, useEffect} from 'react';
import ProjectContainer from '../../../components/ProjectContainer';
import ProductPreview from './ProductPreview';
import ShopSidebar from './ShopSidebar';

import './ecommercepage.css'
const axios = require('axios');

const EcommercePage = () => {
  const [items,setItems] = useState([]);
  const [categories,setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    axios.get('https://fakestoreapi.com/products/')
      .then(function (response) {
        setItems(response.data)
      })
    axios.get('https://fakestoreapi.com/products/categories')
      .then(function (response) {
        setCategories(response.data)
      })
  },[])

  useEffect(()=> {
    if (selectedCategory!="") {
      axios.get('https://fakestoreapi.com/products/category/'+selectedCategory)
        .then(function (response) {
          setItems(response.data)
        })
    }else{
      axios.get('https://fakestoreapi.com/products/')
        .then(function (response) {
          setItems(response.data)
          setLoading(false)
        })
    }

  },[selectedCategory])

  let grt = "";
  let totalRows = items % 4;

  return (
    <ProjectContainer title="My Shop">
    {
      loading
      ?
      <div id="spinner">
        <p id="spinner-text">
          Fetching data...
        </p>
      </div>
      :
      <div id="myShop-wrapper">
        <ShopSidebar categories={categories} handleSelectCategory={(e)=>{setSelectedCategory(e)}}/>
        <div className="product-grid">

          {
            items.map((item, index)=>
              <ProductPreview item={item}/>
            )
          }
        </div>
      </div>
    }



    </ProjectContainer>
  )
}

export default EcommercePage;

import {useState, useEffect} from 'react';
import RatingComponent from "../RatingComponent"
import "./productpreview.css"
const ProductPreview = ({item}) => {

  const [hasDiscount, setHasDiscount] = useState(false)

  useEffect(()=>{

    let discount = Math.floor(Math.random() * 2) > 0;
    setHasDiscount(discount)

  },[])

  return (
    <div className="product-preview-wrapper">
      <img className="product-image" src={item.image}/>
      <div className="product-info">
        <p className="product-name product-text">{item.title}</p>
        <RatingComponent rating={item.rating}/>
        <p className="product-price product-text">
          ${item.price}
          {
            hasDiscount?
            <label className="product-original-price product-text">
              <s>$
                { Math.round(item.price*1.2 * 100) / 100}
              </s>
            </label>
            :null
          }
        </p>
      </div>
    </div>
  )
}

export default ProductPreview;

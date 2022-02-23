import {useState} from 'react';
import Star from'../resources/star2.png';
import HalfStar from'../resources/star.png';
import EmptyStar from '../resources/star3.png'

const RatingComponent = ({rating}) => {

  function drawStars(){
    let amountOfStars = Math.floor(rating.rate);
    let hasHalf = rating.rate % 1 > .5;
    let amountOfEmptyStars = hasHalf? 4 - amountOfStars : 5 - amountOfStars;
    let response = [];
    for (var i = 0; i < amountOfStars; i++) {
      response.push(<img className="rating-star" src={Star}/>)
    }
    if (hasHalf) {
        response.push(<img className="rating-star star-half" src={HalfStar}/>)
    }
    for (var i = 0; i < amountOfEmptyStars; i++) {
      response.push(<img className="rating-star" src={EmptyStar}/>)
    }

    return(
      response
    )
  }


  return (
    <div className="product-rating-wrapper">
      <div className="stars-wrapper">{drawStars()}</div>
      <label className="product-rating-amount product-text">{rating.count}</label>
    </div>
  )
}

export default RatingComponent;

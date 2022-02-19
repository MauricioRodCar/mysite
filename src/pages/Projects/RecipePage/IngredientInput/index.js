import {useState} from 'react';

import './ingredientinput.css'

const IngredientInput = ({handleChange}) => {

  const [sizes, setSizes] = useState([
    "Tbsp of",
    "Cups of",
    "Pieces of",
    "Pounds of",
    "Ounce of",
    "Kg of",
    "Grams of",
    "Liters of",
    "Cm3 of",
    "Gal of"
  ])

  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("Tablespoons");
  const [ingredient, setIngredient] = useState("");

  function verifyFields(){
    if (amount>0 && ingredient!="") {
      handleChange(`${amount} ${size} ${ingredient}`)
    }
  }

  return (
    <div className="ingredient-input-wrapper">
    <p className="input-label">Add ingredient</p>
      <div>

        <input className="custom-input-ingredient" type="number" min="0" value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
        <select id="ingredient-size-select" value={size} onChange={(e)=>{setSize(e.target.value)}}>
        {
            sizes.map((size, index) =>
            <option key={index} value={size}>{size}</option>
          )
        }
        </select>
        <input className="custom-input-ingredient-text" type="text" value={ingredient} onChange={(e)=>{setIngredient(e.target.value)}}/>
        <div className="add-button" onClick={()=>{verifyFields()}}/>
      </div>
    </div>
  )
}

export default IngredientInput;

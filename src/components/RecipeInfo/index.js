import {React, useState} from 'react';
import DownloadImage from'./resources/download.png';
import { jsPDF } from "jspdf";

import './recipeinfo.css';

const RecipeInfo = ({ children, title, image, description, ingredients, steps, handleRemoveIngredients, handleRemoveSteps }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabs, setTabs] = useState([
    {
      label:"Dish image",
      id:1
    },
    {
      label:"Description",
      id:2
    },
    {
      label:"Ingredients",
      id:3
    },
    {
      label:"Steps",
      id:4
    },
    {
      label:"Download",
      id:5
    },
  ])


  function renderTabsContent(){
    switch (activeTab) {
      case 1:
        return(
          <div className="tab-container">
            <p className="tab-title">Dish image</p>
            {
              image?<img className="recipe-image" src={image}/>:null
            }
          </div>
        )
        break;
        case 2:
          return(
            <div className="tab-container">
              <p className="tab-title">Description</p>
              <p className="recipe-description">{description}</p>
            </div>
          )
          break;
        case 3:
          return(
            <div className="tab-container">
              <p className="tab-title">Ingredients</p>
              <ul className="recipe-ingredients">
              {
                ingredients.map((ingredient, index) =>
                <li className="recipe-ingredient">{ingredient} <label className="remove-option" onClick={()=>{handleRemoveIngredients(index)}}>X</label></li>
              )
              }
              </ul>
            </div>
          )
          break;
        case 4:
          return(
            <div className="tab-container">
              <p className="tab-title">Steps</p>
              <ol className="recipe-steps">
              {
                steps.map((step, index) =>
                <li className="recipe-step">{step}  <label className="remove-option" onClick={()=>{handleRemoveSteps(index)}}>X</label></li>
              )
              }
              </ol>
            </div>
          )
          break;
          case 5:
            return(
              <div className="tab-container">
                <p className="tab-title">Download your recipe</p>
                <img className="download-image" onClick={()=>downloadRecipe()} src={DownloadImage}/>
              </div>
            )
            break;
      default:

    }
  }

  function downloadRecipe(){
    let totalHeight = 0;
    let doc = new jsPDF();
    doc.setFont('times','italic')
    doc.setFontSize(40)
    doc.text(title, 65, 25);
    if (image) {
      doc.addImage(image, null, 15, 40, 65, 65)
      doc.setFontSize(16)
      let descriptionSize = description.length;
      let amountOfDescriptionLines = descriptionSize/40;
      for (var i = 0; i < amountOfDescriptionLines; i++) {
        doc.text(description.substring(40*i,40*(i+1)), 100, 40+10*(i+1));
      }
    }else{
      doc.setFontSize(16)
      let descriptionSize = description.length;
      let amountOfDescriptionLines = descriptionSize/40;
      for (var i = 0; i < amountOfDescriptionLines; i++) {
        doc.text(description.substring(40*i,40*(i+1)), 60, 40+10*(i+1));
      }
    }

    doc.setFontSize(30)
    doc.text("Ingredients", 75, 120);
    totalHeight=130;
    doc.setFontSize(16)
    for (var i = 0; i < ingredients.length; i++) {
      totalHeight+=10
      doc.text(ingredients[i], 55, totalHeight);
      if (totalHeight>250) {
        doc.addPage()
        totalHeight=20;
      }
    }
    doc.setFontSize(30)
    totalHeight+=20
    doc.text("Steps", 80, totalHeight);
    totalHeight+=10
    doc.setFontSize(16)
    for (var i = 0; i < steps.length; i++) {
      totalHeight+=10
      doc.text(i+1 + ".- " + steps[i], 55, totalHeight);
      if (totalHeight>250) {
        doc.addPage()
        totalHeight=20;
      }
    }
    doc.save(title+".pdf");
  }

  return(
    <div className="recipe-info-container">
      <div id="recipe-tab-container">
        {
          tabs.map((tab, index) =>
          <div className="tab" id={activeTab==tab.id?"selected-tab":null} key={index} style={index==0?{borderRadius: "0px 25px 0px 0px", borderLeft:"0px"}:(index==tabs.length-1?{borderRadius: "25px 0px 0px 0px", borderRight:"0px"}:null)} onClick={()=> { setActiveTab(tab.id)}}>
            <p>{tab.label}</p>
          </div>
        )
        }
      </div>
      {renderTabsContent()}

    </div>
  )
};

export default RecipeInfo;

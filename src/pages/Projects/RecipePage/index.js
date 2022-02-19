import {useState, useEffect} from 'react';
import ProjectContainer from '../../../components/ProjectContainer';
import CustomImageInput from '../../../components/CustomImageInput';
import TextInput from '../../../components/TextInput';
import TextAreaInput from '../../../components/TextAreaInput';
import RecipeInfo from '../../../components/RecipeInfo';
import IngredientInput from './IngredientInput';
import StepInput from './StepInput';

import './recipepage.css'

const RecipePage = () => {
  const [image,setImage] = useState(null);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);


  function handleNewIngredient(e){
    let newIngredients = [...ingredients];
    newIngredients.push(e);
    setIngredients(newIngredients)
  }

  function handleNewStep(e){
    let newSteps = [...steps];
    newSteps.push(e);
    setSteps(newSteps)
  }

  function removeStep(e){
    let newSteps = [...steps];
    newSteps.splice(e,1);
    setSteps(newSteps)
  }

  function removeIngredient(e){
    let newIngredients = [...ingredients];
    newIngredients.splice(e,1);
    setIngredients(newIngredients)
  }

  console.log( window.innerWidth + "," + window.innerHeight);


  return (
    <ProjectContainer title="Recipe builder">
    <div className="recipe-wrapper">
      <div className="controllers-container">
        <TextInput label="Recipe name" handleChange={(e)=>setTitle(e)}/>
        <CustomImageInput label="Recipe picture" loadImage={(e)=>{setImage(URL.createObjectURL(e[0]));}} image={image} handleDelete={()=>{setImage(null)}}/>
        <TextAreaInput label="Description" handleChange={(e)=>setDescription(e)}/>
        <IngredientInput handleChange={(e)=>{handleNewIngredient(e)}}/>
        <StepInput handleChange={(e)=>{handleNewStep(e)}}/>
      </div>
      <div className="info-container">
        <RecipeInfo title={title} image={image} description={description} ingredients={ingredients} steps={steps} handleRemoveSteps={(e)=>{removeStep(e)}} handleRemoveIngredients={(e)=>{removeIngredient(e)}}/>
      </div>
    </div>
    </ProjectContainer>
  )
}

export default RecipePage;

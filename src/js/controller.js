//import icons from '../img/icons.svg';

import "regenerator-runtime/runtime"
import "core-js/stable"
import * as model from "./model.js"
import recipeView from "./views/recipeview.js"

const recipeContainer = document.querySelector('.recipe');




// https://forkify-api.herokuapp.com/v2
 
 

///////////////////////////////////////
const controlRecipe =  async function(){
  try{
    const id = window.location.hash.slice(1);
    console.log(id);
   if(!id)return;
    //loading recipe
   recipeView.renderSpinner();
    await model.loadRecipe(id);
   const {recipe} =  model.state

  
  recipeView.render(recipe);

   //2 loading recipe
    
  }catch(err){
    alert(err.message);
  }
};

["hashchange" ,"load"].forEach(ev=>{
  window.addEventListener(ev ,controlRecipe);
})


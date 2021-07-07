//import icons from '../img/icons.svg';

import "regenerator-runtime/runtime"
import "core-js/stable"
import * as model from "./model.js"
import recipeView from "./views/recipeview.js"
import searchView from './views/searchview.js';
import ResultView from './views/resultsView.js';
import Pag from "./views/pag.js"


import pag from "./views/pag.js";
const recipeContainer = document.querySelector('.recipe');




// https://forkify-api.herokuapp.com/v2
 
 
 if(module.hot){
   module.hot.accept();
 }

///////////////////////////////////////
const controlRecipe =  async function(){
  try{
    const id = window.location.hash.slice(1);

   if(!id)return;
    //loading recipe
   recipeView.renderSpinner();
    await model.loadRecipe(id);
   const {recipe} =  model.state

  
  recipeView.render(recipe);
 
   //2 loading recipe
 
    
  }catch(err){
 recipeView.renderError();

  }

};

const controlSearchResults = async function(){

  try{

    //load spinner
ResultView.renderSpinner();
    //get searchquery
 const query =  searchView.getQuery();
  if(!query)return;
    await  model.loadSearchResults(query);
    console.log( "model:" ,model.state.search.result);
   //clear searchquery

 //ResultView.render(model.state.search.result);
 
 ResultView.render(model.getSearchResultPage());

Pag.render(model.state.search);
 //render initial pagination button
if(model.state.search.result.length===0){

  ResultView.renderError();
}


  }catch(err){
  console.log(err);
  
  }
};
    
const controlPagination =  function(gotoPage){
  ResultView.render(model.getSearchResultPage(gotoPage));

Pag.render(model.state.search);
};



const controlServings = function(newServings){
  //update the recipe servings (in state)
  model.updateServings(newServings);

  //update the view as well
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

}


const init = function(){
recipeView.addHandlerRender(controlRecipe);
recipeView.addHandlerUpdate(controlServings);
recipeView.add();
searchView.addHandlerSearch(controlSearchResults);
pag.addHandler(controlPagination);

};
console.log(2);

init();
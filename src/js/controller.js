//import icons from '../img/icons.svg';

import "regenerator-runtime/runtime"
import "core-js/stable"
import * as model from "./model.js"
import recipeView from "./views/recipeview.js"
import searchView from './views/searchview.js';
import ResultView from './views/resultsView.js';
import Pag from "./views/pag.js"
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeview.js";
import pag from "./views/pag.js";
import resultsView from "./views/resultsView.js";
import { async } from "regenerator-runtime/runtime";
const recipeContainer = document.querySelector('.recipe');
import {ModalClose} from "./config.js";
//btn.addEventListener("click" , function(){

////  console.log("Open");
//})

// https://forkify-api.herokuapp.com/v2
 
 
 if(module.hot){
   module.hot.accept();
 }

///////////////////////////////////////
const controlRecipe =  async function(){
  try{
    const id = window.location.hash.slice(1);

   if(!id)return;
//update Results view to mark selected search results
resultsView.update(model.getSearchResultPage());
//update bookmark view
bookmarkView.update(model.state.bookmark);
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
   // console.log( "model:" ,model.state.search.result);
   //clear searchquery

 //ResultView.render(model.state.search.result);
 
 ResultView.render(model.getSearchResultPage());

Pag.render(model.state.search);
 //render initial pagination button
if(model.state.search.result.length===0){

  ResultView.renderError();
}


  }catch(err){
 // console.log(err);
  
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
 
const controlAddBookMark  = function(){
  //Add or remove bookmark 
   if(!model.state.recipe.bookmark) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  
   if(model.state.bookmark.length ===0){
     bookmarkView.renderError("No recipe has been bookmarked");
   }
 //console.log(model.state.bookmark);
  recipeView.update(model.state.recipe);

  //2) update recipe view
  bookmarkView.render(model.state.bookmark);
}
const controlBookmarks = function(){
  bookmarkView.render(model.state.bookmark)
}

const controlAddRecipe = async   function (newRecipe){

  try{
//show loading spinner
addRecipeView.renderSpinner();

 await model.uploadRecipe(newRecipe);
//console.log(model.state.recipe);

recipeView.render(model.state.recipe);

//success Message
addRecipeView.successMessage();
//close window


//render the bookmark view
bookmarkView.render(model.state.bookmark);

//change id in the url
window.history.pushState(null , "" , `#${model.state.recipe.id}`);


setTimeout(function(){
  addRecipeView._removeHidden();
} , ModalClose*1000);
}
catch(err){
  //console.error("",err);
  addRecipeView.renderError(err.message);
}
}
const init = function(){
  bookmarkView.addHandlerRender(controlBookmarks);
recipeView.addHandlerRender(controlRecipe);
recipeView.addHandlerUpdate(controlServings);
recipeView.addHandlerAddBookmark(controlAddBookMark);
searchView.addHandlerSearch(controlSearchResults);
pag.addHandler(controlPagination);
addRecipeView.addHandlerUpload(controlAddRecipe)
};
//console.log(2);

init();
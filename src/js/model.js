 import { async } from "regenerator-runtime"
 import {API_URL} from "./config.js";
 import {getJson} from "./helpers.js"
 export const state  ={
    recipe:{

    }
}

export const loadRecipe = async function( id){
    try{
        const data =  await getJson(`${API_URL}/${id}`)
   
   const  {recipe} =  data.data;
   
   console.log(recipe);
  state.recipe= {
     id:recipe.id,
     title:recipe.title,
     publisher:recipe.publisher,
     sourceUrl :recipe.source_url,
     servings:recipe.servings,
     cookingTime:recipe.cooking_time,
     image:recipe.image_url,
     ingredients:recipe.ingredients

   };
console.log(state.recipe);
    }catch(err){
        //
        console.log(err.message);
    }
};
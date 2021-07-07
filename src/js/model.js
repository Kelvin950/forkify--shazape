 import { async } from "regenerator-runtime"
 import {API_URL, resultsPerPage} from "./config.js";
 import {getJson} from "./helpers.js"
 
 export const state  ={
    recipe:{

    },
    search:{
        query:"",
        result:[],

        resultsPerPage:resultsPerPage,
        page:1,
    }
}

export const loadRecipe = async function( id){
    try{
        const data =  await getJson(`${API_URL}${id}`)
   
   const  {recipe} =  data.data;
   
 
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

    }catch(err){
        //
        
        throw err;
    }
};

export const loadSearchResults=async function(query){

    try{
    
        state.search.query=query
        const data = await getJson(`${API_URL}?search=${query}`)

 
 state.search.result = data.data.recipes.map(rec=>{
     return{
        id:rec.id,
        title:rec.title,
        publisher:rec.publisher,
        image:rec.image_url,
       

     }
     
    
 }) ;
if(state.search.result.length===0){
    console.log("ldd");
    
}
   

    }catch(err){
        throw err;
    }

};

export const updateServings =  function(newServings){
    state.recipe.ingredients.forEach(ing=>{
          ing.quantity  =  ing.quantity * newServings /state.recipe.servings;
          //new quantity  =  old quantity * new servings/old servings// 2  *8/4 =  4
    })
    state.recipe.servings =  newServings;
}


export const getSearchResultPage = function(page =  state.search.page){
    
    state.search.page= page;
    const start = (page-1)*state.search.resultsPerPage ;
    const end = page*state.search.resultsPerPage;
return  state.search.result.slice(start,end);

}

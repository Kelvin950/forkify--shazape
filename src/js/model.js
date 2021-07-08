
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
    },
   bookmark:[],
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

   if(state.bookmark.some(bookmark=> bookmark.id === id)){
       state.recipe.bookmark = true;
       
   }
   else state.recipe.bookmark =  false;

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
 state.search.page = 1;

if(state.search.result.length===0){
   // console.log("ldd");
    
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
const persistBookmarks = function(){
    localStorage.setItem("bookmarks" ,JSON.stringify(state.bookmark))
}
export const  addBookMark =  function(recipe){

//add recipe to bookmark
    state.bookmark.push(recipe)

    //Mark current recipe as bookmark

    if(recipe.id  === state.recipe.id) state.recipe.bookmark = true;

 persistBookmarks();
}


export const deleteBookmark =  function(id){
       const index  = state.bookmark.findIndex(el => el.id ===id);
       //delete book mark
    state.bookmark.splice(index ,1);
    console.log(state.bookmark);
  //  unmark bookmark
    if(id  === state.recipe.id) state.recipe.bookmark = false;
    persistBookmarks();
}


const init =  function(){
    const storage  = localStorage.getItem("bookmarks");
    if(storage)state.bookmark = JSON.parse(storage);

}

const clearBookmarks= function(){
    localStorage.clear("bookmarks");
}
init();

//clearBookmarks();
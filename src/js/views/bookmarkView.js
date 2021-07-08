import View from "./view.js";
import PreviewView  from "./previewView.js"
 import icons from 'url:../../img/icons.svg';


 class bookmarkView extends View{

    constructor(){
        super()
        this._parentElement =  document.querySelector(".bookmarks__list");
        this.errmessage =  "We could not find the recipe";
        this.successMessage= ""
    }

    addHandlerRender(handler){
        window.addEventListener("load" ,handler)
    }
    _markup(){
    
    return this._recipe.map(bookmark => PreviewView.render(bookmark , false)).join("");
        
    }
   
     }

     export default new bookmarkView();
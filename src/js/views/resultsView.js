import View from "./view.js";
import PreviewView  from "./previewView.js"
 import icons from 'url:../../img/icons.svg';


 class ResultView extends View{

constructor(){
    super()
    this._parentElement =  document.querySelector(".results");
    this.errmessage =  "We could not find the recipe";
    this.successMessage= ""
}
_markup(){
    
  return this._recipe.map(result => PreviewView.render(result , false)).join("");
      
  }
 }
 export default new ResultView();
import View from "./view";

import icons from 'url:../../img/icons.svg';

class AddrecipeView extends View{

    constructor(){
     super();
        this._parentElement =  document.querySelector(".upload");
       this._overlay  = document.querySelector(".overlay");
       this._window   = document.querySelector(".add-recipe-window");
       this._btnOpen   = document.querySelector(".nav__btn--add-recipe");
       this._btnClose   = document.querySelector(".btn--close-modal");
      this._successMessage= `Recipe was successfully uploaded`;
       this._addHandlerShowWindow();
       this._addHandlerHideWindow();
    
    }
_removeHidden(){
    this._overlay.classList.remove("hidden");
            this._window.classList.remove("hidden");
}

_addHidden(){
    this._overlay.classList.add("hidden");
    this._window.classList.add("hidden");
}
    _addHandlerShowWindow(){
        this._btnOpen.addEventListener("click" ,this._removeHidden.bind(this))
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener("click" ,this._addHidden.bind(this))
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener("submit" , function(e){
            e.preventDefault();
            const dataArray = [...new FormData(this)];
            const data =  Object.fromEntries(dataArray);
            handler(data);

        })
    }
    _markup(){
    
    
    }
    
    
    //page 1 , and there are no other pages
    
     
    
   
  
    
    }

    export default new AddrecipeView();
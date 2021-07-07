import View from "./view.js";
 import icons from 'url:../../img/icons.svg';


 class ResultView extends View{

constructor(){
    super()
    this._parentElement =  document.querySelector(".results");
    this.errmessage =  "We could not find the recipe";
    this.successMessage= ""
}
_markup(){

return this._recipe.map(this._generatePreview).join("");
    
}
_generatePreview(results){
    return `<li class="preview">
    <a class="preview__link preview__link--active" href="#${results.id}">
      <figure class="preview__fig">
        <img src="${results.image}" alt=${results.title} />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${results.title}</h4>
        <p class="preview__publisher">${results.publisher}</p>
      
      </div>
    </a>
  </li>`
}
 }

 export default new ResultView();
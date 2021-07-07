import View from "./view";

import icons from 'url:../../img/icons.svg';

class Pag extends View{

    constructor(){
     super();
        this._parentElement =  document.querySelector(".pagination");
        this.errmessage =  "We could not find the recipe";
        this.successMessage= ""
    
    }
    _markup(){
    
        const curPage = Number(this._recipe.page); 
        const numPages =  Math.ceil(this._recipe.result.length/this._recipe.resultsPerPage);
        console.log(numPages);
    
    //page 1 and there are other pages
        if(curPage ===1 && numPages>1){
            return `<button data-goto =  ${curPage+1} class="btn--inline pagination__btn--next">
            <span>Page ${curPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    
        }
    //last page
    
    if(curPage=== numPages && numPages>1){
      console.log(curPage);
        return  `<button data-goto =  ${curPage-1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page  ${curPage-1}</span>
      </button>`;
    }
    
    //other page
    if(curPage <numPages){
      console.log(curPage);
        return `<button data-goto =  ${curPage-1} class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page  ${curPage-1}</span>
      </button> <button  data-goto =  ${curPage+1}  class="btn--inline pagination__btn--next">
      <span>Page ${curPage+1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`
      
      ;
    }
    
    
    //page 1 , and there are no other pages
    return ;
     }
    
     render1(data){
    
         this._recipe =  data;
         console.log(this._recipe);
         const markup  = this._markup();
         console.log(markup);
        this._clearMethod();
       this._parentElement.insertAdjacentHTML('afterbegin' ,markup );
     }

     addHandler(handler){
       this._parentElement.addEventListener("click" , function(e){
         
        const btn =  e.target.closest('.btn--inline');
        console.log(btn);
        if(!btn) return;
       
        const gotoPage  = btn.dataset.goto;
        console.log(gotoPage);
        handler(gotoPage);
       })
     }
    
    }

    export default new Pag();
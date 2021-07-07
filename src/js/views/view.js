
 
import icons from 'url:../../img/icons.svg';
export default class View{

 
    renderSpinner(){
        const markUp = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
          this._clearMethod();
     this._parentElement.insertAdjacentHTML("afterBegin" , markUp);
      }
    render(data){
if(!data || (Array.isArray(data) && data.length ===0)){

   return
}


        this._recipe= data;
  
        const markup  = this._markup();
        
       this._clearMethod();
      this._parentElement.insertAdjacentHTML('afterbegin' ,markup );

    }

   
update(data)
{
  if(!data || (Array.isArray(data) && data.length ===0)){

    return 
 }

 this._recipe= data;
  
 const Newmarkup  = this._markup();


 const newDom =  document.createRange().createContextualFragment(Newmarkup);
 const  newElements=  Array.from(newDom.querySelectorAll("*"));
const  curElements  = Array.from(this._parentElement.querySelectorAll("*"))
 console.log(curElements);
 console.log(newElements);

 newElements.forEach((el , i)=>{
   const curEl =  curElements[i];
   console.log(curEl , el.isEqualNode(curEl));

   if(!el.isEqualNode(curEl)&& el.firstChild?.nodeValue.trim() !== ""){
     console.log(  "iuu" ,el.firstChild.nodeValue.trim());
     curEl.textContent =  el.textContent;
   }

   if(!el.isEqualNode(curEl)){
     console.log(new);
   }
 });
 
 
}    

    _clearMethod(){
        this._parentElement.innerHTML = "";
    }

    renderError(message =  this.errmessage){
      const markup=`  <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clearMethod();
    this._parentElement.insertAdjacentHTML("afterBegin", markup);
    }
    
    successMessage(message =  this.successMessage){
     const markup=`  <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clearMethod();
    this._parentElement.insertAdjacentHTML("afterBegin", markup);
    }
}
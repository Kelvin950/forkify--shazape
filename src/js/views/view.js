
 
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
    render(data , render =true){
if(!data || (Array.isArray(data) && data.length ===0)){

   return;
}



        this._recipe= data;
  
        const markup  = this._markup();

        if(!render) return markup;
        
       this._clearMethod();
      this._parentElement.insertAdjacentHTML('afterbegin' ,markup );

    }

   
update(data)
{


 this._recipe= data;
  
 const Newmarkup  = this._markup();


 const newDom =  document.createRange().createContextualFragment(Newmarkup);
 const  newElements=  Array.from(newDom.querySelectorAll("*"));
const  curElements  = Array.from(this._parentElement.querySelectorAll("*"))
 //console.log(curElements);
 //console.log(newElements);

 newElements.forEach((el , i)=>{
   const curEl =  curElements[i];
   //console.log(curEl , el.isEqualNode(curEl));
//update change text
   if(!el.isEqualNode(curEl)&& el.firstChild?.nodeValue.trim() !== ""){
    // console.log(  "iuu" ,el.firstChild.nodeValue.trim());
     curEl.textContent =  el.textContent;
   }
 //updates  changed attrrubutes
   if(!el.isEqualNode(curEl)){
  //console.log(el.attributes);
     Array.from(el.attributes).forEach(attr=> curEl.setAttribute(attr.name , attr.value));
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
    
    successMessage(message =  this._successMessage){
     const markup=`<div class="message">
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
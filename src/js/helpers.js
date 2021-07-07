import {timeOutSeconds} from "./config.js"

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };



export const getJson =  async function(url){
try{
    const res =  await Promise.race([fetch(`${url}`) , timeout(timeOutSeconds)]) ;
 
    const data =  await res.json();
    console.log(res);
    console.log(data)
    if(!res.ok){
     throw new Error(`${data.message}, ${res.status}`);
   }
   console.log(res);
 
    
    return data;
    }catch(err){
       throw err.message;
    }
}
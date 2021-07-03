import {timeOutSeconds} from "./config"

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
    
    if(!res.ok){
     throw new Error(`${data.error} (${res.status})`);
   }
   console.log(res);
 
    console.log(data)
    return data;
    }catch(err){
       throw err;
    }
}
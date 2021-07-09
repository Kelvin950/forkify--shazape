import {timeOutSeconds} from "./config.js"

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const ajax =  async function(url , uploadData = undefined){
 
 try{ const fetchPro =uploadData ?fetch(`${url}` , {
    method:"POST",
    headers:{
  "Content-Type":"application/json",

    },
    body:JSON.stringify(uploadData),
  }):fetch(`${url}`)
   const res =  await Promise.race([fetchPro , timeout(timeOutSeconds)]) ;
 
const data =  await res.json();
//  console.log(res);
//  console.log(data)
if(!res.ok){
 throw new Error(`${data.message}, ${res.status}`);
}
//console.log(res);


return data;
}catch(err){
   throw err.message;
}
}
/*
export const getJson =  async function(url){
try{
  
}

export const sendJson =  async function(url , uploadData){
  try{
      const res =  await Promise.race([fetch(`${url}` , {
        method:"POST",
        headers:{
      "Content-Type":"application/json",

        },
        body:JSON.stringify(uploadData),
      }) , timeout(timeOutSeconds)]) ;
   
    
  };*/
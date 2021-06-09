import openSocket from "socket.io-client";
import { setSyntheticTrailingComments } from "typescript";

//  export socket = () =>{
// openSocket("http://localhost:3000");
// this is piece of shit 
//  }  

 export const socket = () => openSocket('http://localhost:8080');


'use-strict'
import Hapi from 'hapi';
import winston from '../configs/winstonconfig';
import Init from './init';
let server = new Hapi.Server();
module.exports.startServer = () =>{
    const init = new Init();
    server.connection({port:3000,host:'localhost'});
    init.start(winston,server);
    

    server.start((err)=>{
        if(err){
            throw err;
        }
    console.log("Hapi Is happily serving at ${server.info.uri}");
    })
}
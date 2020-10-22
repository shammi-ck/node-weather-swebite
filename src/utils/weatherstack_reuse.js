const request = require('request');

const weatherstack = (latitude,longitude,callback) => {    
    const url = 'http://api.weatherstack.com/current?access_key=0c888f7f778cf0e708e7486b5a961094&query='+latitude+','+longitude;
                                
                request({url,json:true},(error,{body})=>{
                    if(error){
                        callback('Kindly check network services',undefined);
                    }else if(body.error){
                        callback('Unable to find location',undefined);
                    }else{
                        callback(undefined,body.current.temperature);
                    }
                })                                
}
module.exports=weatherstack;

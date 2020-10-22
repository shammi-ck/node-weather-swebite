const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require ('./utils/geocode_reuse');
const forecast = require('./utils/weatherstack_reuse');


const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
const staticPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//integrating express with handlebars template engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup for static directory to serve
app.use(express.static(staticPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Shammi CK'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather App',
        name:'Shammi CK',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Weather App',
        name:'Shammi CK',
    })
})


app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            errror:'Address field is mandatory',
        })
    }
    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error){
            return res.send({error})
            // return res.send({error:'error'})
        }
        forecast(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({error})
            }
            res.send({                
                temperature:data,
                latitude,
                longitude,
            })
        })
    });

    // res.send({
    //     temperature:23,
    //     location:'Bangalore',
    //     address: req.query.address,
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'Search term is mandatory',
        })
    }
    console.log('req query is',req.query) 
    res.send({
        products:[],
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        message:'Help article not found',
        title:'404 page'
    });   
})

app.get('*',(req,res)=>{
    res.render('error',{
        message:'error 404: Page not found',
        title:'404 page'
    });
})
//starting the server
// app.listen(3000,()=>{
//     console.log('Server is up on port 3000');
// });
app.listen(port,()=>{
    console.log('Server is up on port '+port);
});

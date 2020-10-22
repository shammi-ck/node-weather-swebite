// console.log('Client side JS file is loaded');

// fetch('http://localhost:3000/weather?address='+location).then(response=>{
//     response.json().then(data => {
//         if(data.error){
//             return console.log('error is ',data.error)
//         }
//         console.log(data.temperature);
//         console.log(data.latitude);
//         console.log(data.longitude);
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



messageOne.textContent='Loading...';
messageTwo.textContent='';

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = search.value;    
    console.log(location);
    fetch('http://localhost:3000/weather?address='+location).then(response=>{
    response.json().then(data => {
        if(data.error){
            return messageOne.textContent=data.error;
        }
        messageTwo.textContent=data.temperature;
        messageTwo.textContent=data.latitude;
        messageTwo.textContent=data.longitude;
        // console.log(data.temperature);
        // console.log(data.latitude);
        // console.log(data.longitude);
    })
})
    
})
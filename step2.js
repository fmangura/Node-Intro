const fs = require('fs');
const axios = require('axios');

const path = process.argv[2];


cat(path);


function cat(path){
    fs.readFile(`${path}`, 'utf8', (err, data) => {
        if(err) {
            console.log(`Error reading ${path}`, err)
            webCat(path)
        }
        console.log(data);
    });
}

function webCat(path){
    axios.get(`${path}`)
    .then(function(resp) {
        console.log(resp.data)
    })
    .catch(err => {
        console.log(`Error: request with status code:${err}`)
    })
}
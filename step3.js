const fs = require('fs');
const axios = require('axios');
const process = require('process')

let intoFile
let path
let out

if (process.argv[2] === '--out') {
    intoFile = process.argv[3];
    path = process.argv[4];
    out = process.argv[2];
    cat(path);
} else {
    path = process.argv[2];
    cat(path);
}

function output(data){
    if (out) {
        writeFile(data, intoFile)
    } else {
        console.log(data)
    }
}

function cat(path){
    fs.readFile(`${path}`, 'utf8', (err, data) => {
        if(err) {
            console.log(`Error reading ${path}`, err)
            webCat(path)
        }
        output(data);
    });
}

async function webCat(path){
    await axios.get(`${path}`)
    .then(function(resp) {
        output(resp.data);
    })
    .catch(err => {
        console.log(`Error: request with status code:${err}`)
        process.kill(1)
    })
}

async function writeFile(writeFile, intoFile) {
    fs.writeFile(`${intoFile}`, `${writeFile}`, 'utf8', err => {
        if (err) {
            console.log(`Couldn't write: intoFile`, err)
            process.kill(2)
        }
        console.log(`no output, but ${intoFile} contains ${process.argv[4]}`)
    })
}
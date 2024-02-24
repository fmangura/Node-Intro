const fs = require('fs');

const path = process.argv[2];
console.log(path)

fs.readFile(`${path}`, 'utf8', (err, data) => {
    if(err) {
        console.log(`Error reading ${path}`, err)
        process.kill(1)
    }
    console.log(data);
});
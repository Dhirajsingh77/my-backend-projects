const { readFileSync, writeFileSync } = require('fs');

const first = readFileSync(`./content/first.txt`, 'utf8');
const second = readFileSync(`./content/second.txt`, 'utf8');

console.log(first, second);

//if result-sync.txt  exist then it will write the given content
//after erasing the existing content 
//if result file not exist then is create it and do the above things 
writeFileSync('./content/result-sync.txt',`hello world : ${first}, ${second}`)  

//if result-sync.txt  exist then it will write the given content
//it will apend in the existing content 
//if result file not exist then is create it and do the above things 

writeFileSync('./content/result-sync.txt',`hello world : ${first}, ${second}`,{ flag: 'a'})
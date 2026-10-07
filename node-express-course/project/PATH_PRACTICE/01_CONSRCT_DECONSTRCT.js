/*
Use path.join() to safely create a file path pointing to 
'logs', '2026', 'app.log'. Print the resulting path.
*/
const path = require("path");
const p =path.join("logs","2026","app.log");
console.log(p);

/*Given the full path string '/users/project/src/index.js':

Extract and print just the file extension (.js).

Extract and print just the filename (index.js).

Extract and print the folder directory (/users/project/src).
*/

const p2 = "users/project/src/index.js";
console.log(path.extname(p2));    
console.log(path.basename(p2));
console.log(path.dirname(p2));


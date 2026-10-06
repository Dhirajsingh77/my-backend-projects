/*
Take the existing notes.txt file and add a new line to the end: 
"Adding a second line."
*/

const fs= require("fs");
fs.appendFileSync("notes.txt"," Adding a second line");

/*
Read notes.txt again and print the updated content to verify 
the original line was not erased.
*/

const data= fs.readFileSync("notes.txt","utf8");
console.log(data);
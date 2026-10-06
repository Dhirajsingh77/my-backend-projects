/*
Create a file named notes.txt and write the text:
 "Node.js File System is easy!" into it.
*/

const fs=require("fs");
fs.writeFileSync("notes.txt","Node.js File System is easy!" );

/*
Read the contents of notes.txt and print the output to your 
terminal console.
(Tip: Make sure to read the file as 'utf-8' so it outputs 
readable text instead of raw buffer data).
*/

const data=fs.readFileSync("notes.txt","utf8");
console.log(data);
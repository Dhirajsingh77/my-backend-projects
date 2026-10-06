/*
Create a new directory/folder named data.
*/
const fs=require("fs");
fs.mkdirSync("data");

/*
Inside the data folder, create a file named user.json 
that stores a simple JavaScript object converted into a string 
(e.g., { name: "Alex", role: "Developer" }).
*/
const user = {name: "Alex", role: "Developer"};
fs.writeFileSync("user.json",JSON.stringify(user));



/*
Read user.json, parse it back into a JavaScript object (JSON.parse), 
and print the user's name to the console.
*/
const data= fs.readFileSync("user.json","utf8");
console.log(data);
const obj=JSON.parse(data);
console.log(`name: ${obj.name}`);
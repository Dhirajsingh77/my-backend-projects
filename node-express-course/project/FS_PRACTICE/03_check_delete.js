/*
Write code to check if notes.txt exists in your folder.
*/
const fs=require("fs");
const check=fs.existsSync("notes.txt");

/*
If it exists, print "File found! Deleting now..." and delete notes.txt.
*/
if (check){
    console.log("File found! Deleting now...");
    fs.unlinkSync("notes.txt");

}

/*
If it does not exist, print "File does not exist!".
*/
if (!check){
    console.log("File does not exist!");
}
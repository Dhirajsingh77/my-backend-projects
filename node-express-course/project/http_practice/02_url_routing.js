/*
Update your server request listener to read req.url.

Implement simple route handling using if / else or switch:

If the request URL is '/', respond with "Welcome to the Homepage!".

If the request URL is '/about', respond with "About Us Page".

For any other URL, set the HTTP status code to 404 and respond with "404 
Page Not Found".

Test all three URL paths in your browser (/, /about, /contact)
*/

const http=require("http");
const server= http.createServer((req,res)=> {
    if (req.method === "GET" && req.url === "/"){
        res.statusCode=200;
        res.end("Welcome to the Homepage!");
    }
    else if (req.method === "GET" && req.url === "/about") {
        res.statusCode=200;
        res.end("About Us Page");
    }
    else {
        res.statusCode=404;
        res.end("404 Page Not Found");
    }
})
server.listen(3000);
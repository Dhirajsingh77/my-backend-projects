/*
Import the http module and create a server using http.createServer().

Inside the request listener callback:

Set the response status code to 200.

Set the Content-Type header to 'text/plain'.

Send the response message: "Hello from Node.js HTTP Server!".

Make the server listen on port 3000.

Print "Server running on http://localhost:3000" when the server successfully
 starts listening.

Open your web browser and navigate to http://localhost:3000 to verify your 
response.
*/
const http= require("http");
const server=http.createServer((req,res) => {
res.statusCode=200;
res.setHeader("Content-Type","text/plain");
res.end("Hello from Node.js HTTP Server!");
} );

server.listen(3000,()=> {
    console.log("Server running on port 3000");
} );


# Node.js Built-in Modules — Placement Revision Notes

## 1. Built-in Modules

Node.js provides **built-in modules** that allow us to perform common tasks without installing external packages.

Examples:

* `os` → Operating system information
* `path` → Work with file/directory paths
* `fs` → File system operations
* `http` → Create HTTP servers
* `events` → Event handling
* `url` → Work with URLs

### Importing a Built-in Module

```js
const os = require("os");
const path = require("path");
const fs = require("fs");
const http = require("http");
```

> **Interview:** Built-in modules are included with Node.js, so they don't need `npm install`.

---

# 2. OS Module

The `os` module provides information about the **operating system and computer**.

```js
const os = require("os");
```

### Important Methods

```js
os.platform()
```

Returns the operating system platform.

```js
os.arch()
```

Returns CPU architecture.

```js
os.cpus()
```

Returns information about CPU cores.

```js
os.hostname()
```

Returns computer hostname.

```js
os.homedir()
```

Returns user's home directory.

```js
os.tmpdir()
```

Returns temporary files directory.

```js
os.totalmem()
```

Returns total system memory in bytes.

```js
os.freemem()
```

Returns available memory in bytes.

```js
os.userInfo()
```

Returns information about the current user.

### Example

```js
console.log(os.platform());
console.log(os.arch());
console.log(os.cpus().length);
console.log(os.totalmem());
```

### Placement Point

`os.cpus().length` can be used to determine the number of logical CPU cores.

---

# 3. Path Module

The `path` module provides utilities for working with **file and directory paths**.

```js
const path = require("path");
```

### Important Methods

### `path.join()`

Combines path segments correctly.

```js
const p = path.join("folder", "files", "data.txt");

console.log(p);
```

---

### `path.resolve()`

Creates an **absolute path**.

```js
const p = path.resolve("folder", "data.txt");
```

---

### `path.basename()`

Returns the last part of a path.

```js
path.basename("/home/user/file.txt");
// file.txt
```

---

### `path.dirname()`

Returns the directory portion.

```js
path.dirname("/home/user/file.txt");
// /home/user
```

---

### `path.extname()`

Returns the file extension.

```js
path.extname("file.txt");
// .txt
```

---

### `path.parse()`

Breaks a path into components.

```js
path.parse("/home/user/file.txt");
```

Returns information such as:

```text
root
dir
base
ext
name
```

---

### `path.isAbsolute()`

Checks whether a path is absolute.

```js
path.isAbsolute("/home/user");
// true
```

### `__dirname` and `__filename`

In CommonJS:

```js
console.log(__dirname);
console.log(__filename);
```

* `__dirname` → current directory's absolute path
* `__filename` → current file's absolute path

### Placement Point

Prefer `path.join()` / `path.resolve()` instead of manually creating paths with `/` because path separators differ between operating systems.

---

# 4. FS Module — File System

The `fs` module allows Node.js to **create, read, write, update and delete files/directories**.

```js
const fs = require("fs");
```

There are two major styles:

* **Synchronous (Sync)**
* **Asynchronous (Async)**

---

# 5. FS — Synchronous Methods

Synchronous operations **block execution** until the operation finishes.

### Write File

```js
fs.writeFileSync("file.txt", "Hello World");
```

Creates/replaces the file.

---

### Read File

```js
const data = fs.readFileSync("file.txt", "utf8");

console.log(data);
```
here if 'utf8' not included then output will be raw buffer data 
{ <Buffer 4e 6f 64 65 2e 6a 73 20 >}

---

### Append File

```js
fs.appendFileSync("file.txt", "\nNew line");
```

Adds content without replacing existing content.

---

### Delete File

```js
fs.unlinkSync("file.txt");
```

---

### Create Directory

```js
fs.mkdirSync("folder");
```

# Creating Directories — Node.js

## Problem

`fs.mkdir()` throws an error if the directory already exists.

```javascript
const fs = require("fs");

fs.mkdir("./folder", (err) => {
    if (err) throw err;
    console.log("Folder created");
});
```

Running this again → **Error: EEXIST** because `folder` already exists.

---

## Solution 1: Handle the Error

```javascript
fs.mkdir("./folder", (err) => {
    if (err) {
        console.log("Folder already exists");
        return;
    }

    console.log("Folder created");
});
```

---

## Solution 2: Use `recursive: true` ⭐

Recommended when you want the directory to exist whether or not it already exists.

```javascript
fs.mkdir("./folder", { recursive: true }, (err) => {
    if (err) throw err;

    console.log("Folder is ready");
});
```

### Why `recursive: true`?

- Creates the folder if it doesn't exist.
- Does **not throw an error** if it already exists.
- Can also create parent directories if needed.

```javascript
fs.mkdir("./a/b/c", { recursive: true }, (err) => {
    if (err) throw err;
});
```

### ⭐ Interview Point

```text
fs.mkdir()
       ↓
Directory doesn't exist → creates it
Directory already exists → EEXIST error

fs.mkdir(path, { recursive: true })
       ↓
Directory doesn't exist → creates it
Directory already exists → no error
```



---

### Remove Directory

```js
fs.rmdirSync("folder");
```

> Modern Node.js commonly uses `fs.rmSync()` for removing files/directories.

---

### Check if File Exists

```js
fs.existsSync("file.txt");
```

Returns:

```text
true / false
```

---

# 6. FS — Asynchronous Methods

Asynchronous operations **do not block the main execution flow** while waiting for I/O.

### Write

```js
fs.writeFile("file.txt", "Hello", (err) => {
    if (err) throw err;
    console.log("File written");
});
```

---

### Read

```js
fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) throw err;

    console.log(data);
});
```

---

### Append

```js
fs.appendFile("file.txt", "\nNew line", (err) => {
    if (err) throw err;
});
```

---

### Delete

```js
fs.unlink("file.txt", (err) => {
    if (err) throw err;
});
```

---

# 7. Sync vs Async

| Synchronous                | Asynchronous                       |
| -------------------------- | ---------------------------------- |
| Blocks execution           | Doesn't block while I/O is pending |
| Easier to understand       | Better for server applications     |
| Code executes sequentially | Other work can continue            |
| Can reduce performance     | Better scalability                 |
| `readFileSync()`           | `readFile()`                       |

### Example

```js
console.log("Start");

const data = fs.readFileSync("file.txt", "utf8");

console.log(data);
console.log("End");
```

The next statement waits until the file is completely read.

### Async

```js
console.log("Start");

fs.readFile("file.txt", "utf8", (err, data) => {
    console.log(data);
});

console.log("End");
```

Output generally:

```text
Start
End
file content
```

### Placement Point ⭐

Node.js is designed around **non-blocking I/O**.

For server applications, asynchronous APIs are generally preferred because synchronous I/O can block the event loop.

---

# 8. HTTP Module

The `http` module allows Node.js to create **HTTP servers**.

```js
const http = require("http");
```

No external package is required.

---

# 9. Creating an HTTP Server

```js
const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Hello World");
});

server.listen(3000);
```

Open:

```text
http://localhost:3000
```

### `http.createServer()`

Creates an HTTP server.

The callback receives:

```js
(req, res)
```

* `req` → Incoming request
* `res` → Response sent to client

---

# 10. Request Object

The `req` object contains information about the incoming request.

### HTTP Method

```js
req.method
```

Examples:

```text
GET
POST
PUT
DELETE
```

### Requested URL

```js
req.url
```

Example:

```text
/
```

or

```text
/about
```

### Example

```js
const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    res.end("Hello");
});
```

---

# 11. Response Object

The `res` object is used to send a response.

### Send Response

```js
res.end("Hello World");
```

---

### Set Status Code

```js
res.statusCode = 200;
```

Common status codes:

| Code  | Meaning               |
| ----- | --------------------- |
| `200` | OK                    |
| `201` | Created               |
| `400` | Bad Request           |
| `401` | Unauthorized          |
| `403` | Forbidden             |
| `404` | Not Found             |
| `500` | Internal Server Error |

---

### Set Headers

```js
res.setHeader("Content-Type", "text/plain");
```

For JSON:

```js
res.setHeader("Content-Type", "application/json");
```

---

# 12. HTTP Routing

Without Express, basic routing can be done using `req.url`.

```js
const server = http.createServer((req, res) => {

    if (req.url === "/") {
        res.end("Home");
    }

    else if (req.url === "/about") {
        res.end("About");
    }

    else {
        res.statusCode = 404;
        res.end("Page Not Found");
    }
});

server.listen(3000);
```

### Request Example

```text
GET /about
```

Then:

```js
req.method === "GET"
req.url === "/about"
```

---

# 13. HTTP Method + URL Routing

Better routing checks both method and URL.

```js
if (req.method === "GET" && req.url === "/users") {
    res.end("Get Users");
}
```

Example:

```js
if (req.method === "POST" && req.url === "/users") {
    res.end("Create User");
}
```

This is the basic idea behind API routing.

---

# 14. JSON Response

To send JSON:

```js
const data = {
    name: "Dhiraj",
    age: 22
};

res.setHeader("Content-Type", "application/json");

res.end(JSON.stringify(data));
```

### Important

HTTP response body is sent as data, so JavaScript objects are converted to JSON strings using:

```js
JSON.stringify()
```

---

# 15. `server.listen()`

Starts the server and listens for incoming requests.

```js
server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

### Port

```text
3000
```

is the port number.

You can use other ports such as:

```text
5000
8000
8080
```

---

# 16. Complete Basic HTTP Server

```js
const http = require("http");

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "text/plain");

    if (req.method === "GET" && req.url === "/") {
        res.statusCode = 200;
        res.end("Home Page");
    }

    else if (req.method === "GET" && req.url === "/about") {
        res.statusCode = 200;
        res.end("About Page");
    }

    else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

---

# 17. Important Placement Questions

### What are Node.js built-in modules?

Modules provided directly by Node.js that can be used without installing external packages.

---

### What is the `fs` module?

Used to interact with the file system.

---

### Difference between `readFile()` and `readFileSync()`?

* `readFile()` → asynchronous, non-blocking
* `readFileSync()` → synchronous, blocking

---

### Why avoid synchronous file operations in servers?

Because they can **block the event loop**, preventing Node.js from handling other work efficiently.

---

### What is the `path` module used for?

To safely create, manipulate and analyze file/directory paths.

---

### What does `__dirname` mean?

Absolute path of the current directory in CommonJS.

---

### What does `__filename` mean?

Absolute path of the current file in CommonJS.

---

### What is `http.createServer()`?

Creates an HTTP server that can receive requests and send responses.

---

### What are `req` and `res`?

```text
req → request from client
res → response sent by server
```

---

### What is routing?

Determining what response/action should happen based on the request's **URL and HTTP method**.

---

### Why is Node.js good for I/O-heavy applications?

Because its **non-blocking, event-driven architecture** allows it to handle many I/O operations efficiently without creating a separate thread for every request.

---

# Quick Revision

```text
Built-in Modules
│
├── os
│   └── System information
│
├── path
│   └── File/directory paths
│
├── fs
│   ├── Sync → Blocking
│   └── Async → Non-blocking
│
└── http
    ├── Create server
    ├── req
    ├── res
    ├── status codes
    ├── headers
    └── routing
```

## Must Remember

```text
os       → Operating System
path     → File paths
fs       → File System
http     → HTTP Server

Sync     → Blocking
Async    → Non-blocking

req      → Request
res      → Response

req.url     → Requested URL
req.method  → HTTP method

res.end()        → Send response
res.statusCode   → Set status
res.setHeader()  → Set response header

server.listen()  → Start server
```


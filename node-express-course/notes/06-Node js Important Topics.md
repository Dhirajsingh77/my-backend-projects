# Node.js Important Topics — Placement Revision Notes

## 1. Event Loop

### What is the Event Loop?

The **Event Loop** allows Node.js to handle asynchronous operations without blocking the main JavaScript thread while waiting for I/O.

### Important Concepts

- **Call Stack:** Executes JavaScript functions.
- **Event Loop:** Coordinates the execution of eligible callbacks.
- **Microtask Queue:** Handles Promise callbacks such as `.then()` and `.catch()`.
- **Timers:** Execute callbacks scheduled using `setTimeout()` and `setInterval()`.
- **libuv Thread Pool:** Handles certain operations, including many filesystem operations.

### Example

```js
console.log("First");

setTimeout(() => {
    console.log("Second");
}, 0);

console.log("Third");
```

Output:

```text
First
Third
Second
```

**Why?** Synchronous code executes first. The timer callback runs later when eligible.

### Promise vs Timer

```js
console.log("Start");

setTimeout(() => console.log("Timer"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");
```

Output:

```text
Start
End
Promise
Timer
```

### Placement Points

- Node.js uses an event-driven, non-blocking I/O model.
- `setTimeout(fn, 0)` does not mean immediate execution.
- Promise handlers run as microtasks.
- CPU-intensive synchronous code can block the Event Loop.

---

## 2. Blocking vs Non-Blocking Code

### Synchronous (Blocking)

```js
const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("file.txt", "utf8");

console.log(data);
console.log("End");
```

Execution waits until the file is read.

### Asynchronous (Non-Blocking)

```js
const fs = require("fs");

console.log("Start");

fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(data);
});

console.log("End");
```

Execution continues while the file is being read.

| Synchronous | Asynchronous |
|---|---|
| Blocks execution | Allows other work while waiting |
| Simpler control flow | Often needs callbacks or Promises |
| `readFileSync()` | `readFile()` |

**Placement:** Avoid blocking filesystem operations in request-handling code when possible.

---

## 3. Promises

A **Promise** represents the eventual result of an asynchronous operation.

### Three States

- `pending`
- `fulfilled`
- `rejected`

### Creating a Promise

```js
const myPromise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
        resolve("Success");
    } else {
        reject(new Error("Failed"));
    }
});
```

### Handling a Promise

```js
myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        console.log("Completed");
    });
```

- `resolve()` fulfills the Promise.
- `reject()` rejects the Promise.
- `.then()` handles fulfillment.
- `.catch()` handles rejection.
- `.finally()` runs after settlement.

---

## 4. Async/Await

`async/await` provides a cleaner way to work with Promises.

```js
async function getData() {
    try {
        const result = await myPromise;
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

getData();
```

### Important Points

- An `async` function always returns a Promise.
- `await` waits for a Promise to settle within the async function.
- `try/catch` can handle rejected Promises.
- `await` does not block the entire JavaScript thread.

### Node.js Native Promise API

```js
const fs = require("fs/promises");

async function readData() {
    try {
        const data = await fs.readFile("file.txt", "utf8");
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

readData();
```

**Placement:** `fs/promises` provides Promise-based filesystem methods.

---

## 5. Events and EventEmitter

Node.js uses an **event-driven architecture**. An event represents something that has happened.

The `events` module provides `EventEmitter`.

### Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}`);
});

emitter.emit("greet", "Dhiraj");
```

Output:

```text
Hello, Dhiraj
```

### Important Methods

| Method | Purpose |
|---|---|
| `on()` | Registers an event listener |
| `emit()` | Triggers an event |
| `once()` | Runs listener only once |
| `off()` | Removes a specific listener |
| `removeAllListeners()` | Removes listeners for an event |

### `on()` vs `once()`

```js
emitter.on("login", callback);
```

Runs every time the event is emitted.

```js
emitter.once("login", callback);
```

Runs only once.

**Placement:** EventEmitter listeners execute synchronously by default, in registration order.

---

## 6. Streams

### What is a Stream?

A **Stream** processes data in chunks instead of loading all data into memory at once.

Useful for large files, network communication and media.

### Four Types of Streams

| Type | Purpose |
|---|---|
| Readable | Reads data |
| Writable | Writes data |
| Duplex | Reads and writes data |
| Transform | Modifies data while reading/writing |

### Reading a File Using a Stream

```js
const fs = require("fs");

const readStream = fs.createReadStream("large.txt", {
    encoding: "utf8"
});

readStream.on("data", (chunk) => {
    console.log(chunk);
});

readStream.on("end", () => {
    console.log("Reading completed");
});

readStream.on("error", (err) => {
    console.error(err);
});
```

### Important Events

- `data` — a chunk is received.
- `end` — no more data remains.
- `error` — an error occurs.

### Piping Streams

```js
const fs = require("fs");

const readable = fs.createReadStream("input.txt");
const writable = fs.createWriteStream("output.txt");

readable.pipe(writable);
```

Transfers data from a readable stream to a writable stream.

### Backpressure

**Backpressure** occurs when data is produced faster than the destination can consume it. Streams provide mechanisms to regulate data flow.

### Why Use Streams?

- Lower memory usage for large files.
- Process data incrementally.
- Efficient data transfer.
- Better handling of backpressure.

---

## 7. HTTP Request/Response Cycle

When a client communicates with a server:

1. Client sends an HTTP request.
2. Server receives and processes it.
3. Server sends an HTTP response.
4. Client receives the response.

### HTTP Request Contains

- Method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- URL/path
- Headers
- Optional body

### HTTP Response Contains

- Status code
- Headers
- Optional body

---

## 8. HTTP Headers

Headers provide metadata about requests and responses.

### Common Request Headers

| Header | Purpose |
|---|---|
| `Content-Type` | Format of request body |
| `Accept` | Response formats the client accepts |
| `Authorization` | Credentials or access token |
| `User-Agent` | Identifies client software |

### Common Response Headers

| Header | Purpose |
|---|---|
| `Content-Type` | Format of response body |
| `Cache-Control` | Caching instructions |
| `Set-Cookie` | Sends a cookie to the client |
| `Access-Control-Allow-Origin` | Controls permitted cross-origin access |

### Example

```js
res.setHeader("Content-Type", "application/json");

res.end(JSON.stringify({
    message: "Success"
}));
```

For HTML:

```js
res.setHeader("Content-Type", "text/html; charset=utf-8");
```

---

## 9. HTTP Request Object

The `req` object contains information about the incoming request.

```js
const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);

    res.end("Response received");
});

server.listen(3000);
```

### Important Properties

- `req.method` — HTTP method.
- `req.url` — requested URL.
- `req.headers` — request headers.

### Reading a POST Request Body

The request body arrives as a stream.

```js
let body = "";

req.on("data", (chunk) => {
    body += chunk;
});

req.on("end", () => {
    console.log(body);
    res.end("Body received");
});
```

**Important:** Handle request errors, limit body size and parse JSON safely in production applications.

---

## 10. Serving an HTML File

```js
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        const filePath = path.join(__dirname, "index.html");

        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("Internal Server Error");
                return;
            }

            res.setHeader(
                "Content-Type",
                "text/html; charset=utf-8"
            );

            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000);
```

### Important Points

- `fs.readFile()` reads the HTML file.
- `path.join()` constructs the file path.
- `__dirname` gives the current directory in CommonJS.
- `res.end()` sends the response.
- For large files, consider streams to reduce memory usage.

---

## 11. HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `204` | No Content |
| `301` | Moved Permanently |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## 12. Important Placement Questions

1. What is the Event Loop?
2. What is the difference between blocking and non-blocking I/O?
3. What are the three states of a Promise?
4. What is the difference between `.then()` and `async/await`?
5. What is EventEmitter? Explain `on()`, `once()` and `emit()`.
6. What are the four types of streams?
7. What is backpressure?
8. Why are streams useful for large files?
9. Explain the HTTP request/response cycle.
10. What are HTTP headers?
11. How do you read a POST request body in Node.js?
12. Why can synchronous code reduce server responsiveness?

---

## Quick Revision

```text
Event Loop
    → Coordinates asynchronous callbacks

Blocking I/O
    → Waits and blocks execution

Non-blocking I/O
    → Allows other work while waiting

Promise
    → Represents an eventual result

async/await
    → Cleaner Promise handling

EventEmitter
    → on(), once(), emit()

Streams
    → Readable, Writable, Duplex, Transform

HTTP
    → Request, Response, Headers, Status Codes
```

### Study Priority

1. Event Loop and asynchronous execution
2. Promises and async/await
3. EventEmitter
4. Streams and backpressure
5. HTTP request/response cycle
6. Headers, status codes and serving HTML


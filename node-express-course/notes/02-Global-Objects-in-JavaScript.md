# Global Objects in JavaScript (Node.js)

- Global objects are available throughout a Node.js application without importing them.
- They can be accessed from any module.

## Common Global Objects

| Global | Description |
|---|---|
| `global` | Global namespace in Node.js |
| `__dirname` | Current directory path |
| `__filename` | Current file path |
| `process` | Provides information about the current Node.js process |
| `console` | Used to display output |
| `setTimeout()` | Executes a callback after a delay |
| `setInterval()` | Repeatedly executes a callback |
| `Buffer` | Handles binary data |

## Example

```javascript
console.log(__dirname);
console.log(__filename);
console.log(process.version);

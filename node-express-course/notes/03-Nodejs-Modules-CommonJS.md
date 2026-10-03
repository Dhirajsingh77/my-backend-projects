
# Node.js Modules (CommonJS)

- Every file in Node.js is treated as a separate module by default.
- Modules encapsulate code and share only what is needed.
- `require()` is used to import modules.
- `module.exports` is used to export data or functions.

## 1. Exporting Modules

- **Named exports:** Export multiple values using an object.

```javascript
// names.js
const john = "john";
const peter = "peter";

module.exports = { john, peter };
```

- **Single export:** Export a function or value directly.

```javascript
// utils.js
const sayhi = (name) => {
    console.log(`Hi there ${name}`);
};

module.exports = sayhi;
```

- **Multiple exports:** Export multiple properties separately.

```javascript
// 03-alternative-flavor.js
module.exports.items = ["items1", "items2"];

const person = { name: "bob" };

module.exports.singlePerson = person;
```

## 2. Importing Modules

- `require()` imports functions, objects, or values from other modules.
- Use `./` for files in the current directory.

```javascript
// app.js
const names = require("./names");
const sayhi = require("./utils");
const data = require("./03-alternative-flavor");

sayhi(names.john);
console.log(data.items);
console.log(data.singlePerson);
```

## 3. Module Execution

- A module's code executes when it is first required.
- Node.js caches loaded modules, so they are not normally executed again on subsequent `require()` calls.

```javascript
// app.js
require("./07-mind-granade");
```

- Requiring a module executes its code, even if its exports are not stored in a variable.
- This is useful for modules that perform tasks when loaded.

## Key Points

- `require()` → Imports a module.
- `module.exports` → Exports data or functions.
- `./` → Refers to a local file.
- Each file has its own scope.
- Modules help organize and reuse code.

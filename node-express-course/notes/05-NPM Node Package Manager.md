# NPM (Node Package Manager)

## 1. What is NPM?

**NPM = Node Package Manager**

It is the default package manager for Node.js.

NPM is used to:

- Install packages/dependencies
- Manage project dependencies
- Run scripts
- Share/publish packages
- Manage package versions

> **Placement:** NPM comes with Node.js installation.

---

# 2. Check NPM Version

```bash
npm -v
```

Check Node.js:

```bash
node -v
```

---

# 3. Initialize a Node Project

```bash
npm init
```

Creates:

```text
package.json
```

For automatic/default setup:

```bash
npm init -y
```

---

# 4. `package.json`

`package.json` contains important information about a Node.js project.

Example:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}
```

### Important fields

| Field | Purpose |
|---|---|
| `name` | Project name |
| `version` | Project version |
| `main` | Entry point |
| `scripts` | Custom commands |
| `dependencies` | Packages required by application |
| `devDependencies` | Packages needed mainly during development |

---

# 5. Installing Packages

### Install a package

```bash
npm install package-name
```

Short form:

```bash
npm i package-name
```

Example:

```bash
npm install express
```

This:

- Downloads the package
- Creates/updates `node_modules`
- Adds package to `dependencies`
- Updates `package-lock.json`

---

# 6. `node_modules`

`node_modules` contains the installed packages and their dependencies.

Example:

```text
project/
├── node_modules/
├── package.json
├── package-lock.json
└── app.js
```

### Important

❌ Usually don't push `node_modules` to GitHub.

Add:

```text
node_modules/
```

to `.gitignore`.

---

# 7. `package-lock.json`

`package-lock.json` records the **exact dependency versions** installed for the project.

Purpose:

- Consistent installations
- Reproducible builds
- Records dependency tree
- Helps avoid unexpected version changes

### `package.json` vs `package-lock.json`

```text
package.json
→ What dependencies the project needs

package-lock.json
→ Exact versions/dependency tree installed
```

> **Placement:** Commit `package-lock.json` to Git.

---

# 8. Install Development Dependency

```bash
npm install package-name --save-dev
```

Short form:

```bash
npm i package-name -D
```

Example:

```bash
npm i nodemon -D
```

It appears under:

```json
"devDependencies": {
  "nodemon": "..."
}
```

### Dependency vs DevDependency

```text
dependencies
→ Required when application runs

devDependencies
→ Mainly required during development
```

---

# 9. Installing a Specific Version

```bash
npm install express@4.18.2
```

Install latest:

```bash
npm install express@latest
```

---

# 10. Uninstall Package

```bash
npm uninstall package-name
```

Example:

```bash
npm uninstall express
```

Short form:

```bash
npm remove express
```

---

# 11. Update Packages

```bash
npm update
```

Update a specific package:

```bash
npm update express
```

---

# 12. Installing Existing Project Dependencies

When you clone/download a Node.js project:

```bash
npm install
```

NPM reads:

```text
package.json
```

and installs the required dependencies into:

```text
node_modules/
```

### Important

You normally don't need to send `node_modules` to someone.

Send:

```text
package.json
package-lock.json
```

Then they run:

```bash
npm install
```

---

# 13. NPM Scripts

Scripts are custom commands defined inside `package.json`.

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

Run:

```bash
npm start
```

Run custom script:

```bash
npm run dev
```

### Important

`start` has a special shortcut:

```bash
npm start
```

For most other custom scripts:

```bash
npm run script-name
```

---

# 14. `npx`

`npx` is used to **execute packages/CLI tools**.

Example:

```bash
npx nodemon app.js
```

It is especially useful for running CLI packages without manually installing them globally.

### NPM vs NPX

```text
npm
→ Install/manage packages

npx
→ Execute packages/CLI tools
```

---

# 15. Global vs Local Installation

### Local

```bash
npm install package-name
```

Installed inside the project:

```text
node_modules/
```

### Global

```bash
npm install -g package-name
```

Available system-wide.

### Placement Point ⭐

For project dependencies, prefer **local installation**.

---

# 16. Semantic Versioning

NPM commonly uses:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
4.18.2
│ │  │
│ │  └── PATCH
│ └───── MINOR
└─────── MAJOR
```

### Meaning

```text
MAJOR
→ Breaking changes

MINOR
→ New backward-compatible features

PATCH
→ Bug fixes
```

---

# 17. Version Symbols

Example:

```json
"express": "^5.1.0"
```

### `^`

Allows compatible minor/patch updates within the same major version.

Example conceptually:

```text
^5.1.0
→ >=5.1.0 and <6.0.0
```

### `~`

Allows patch-level updates.

```text
~5.1.0
→ >=5.1.0 and <5.2.0
```

### Exact version

```text
5.1.0
```

Only that version is requested.

---

# 18. Common NPM Commands

```bash
npm -v
```

Check NPM version.

```bash
npm init
```

Initialize project.

```bash
npm init -y
```

Initialize with defaults.

```bash
npm install
```

Install project dependencies.

```bash
npm install express
```

Install package.

```bash
npm install express -D
```

Install development dependency.

```bash
npm uninstall express
```

Remove package.

```bash
npm update
```

Update packages.

```bash
npm list
```

Show installed packages.

```bash
npm outdated
```

Check outdated packages.

```bash
npm start
```

Run start script.

```bash
npm run dev
```

Run custom script.

```bash
npm audit
```

Check dependencies for known security vulnerabilities.

---

# 19. NPM Project Flow

```text
Create project
      ↓
npm init -y
      ↓
package.json
      ↓
npm install package
      ↓
node_modules/
package-lock.json
      ↓
Write application
      ↓
npm run <script>
```

---

# 20. Placement Questions

### What is NPM?

Node Package Manager; used to install and manage Node.js packages and project dependencies.

### What is `package.json`?

Project metadata and dependency configuration file.

### What is `node_modules`?

Directory containing installed packages and their dependencies.

### What is `package-lock.json`?

Records the exact dependency versions/tree used for installation.

### Should `node_modules` be committed to Git?

**No.** It should normally be added to `.gitignore`.

### Should `package-lock.json` be committed?

**Yes**, normally.

### `npm install` vs `npm init`?

```text
npm init
→ Creates package.json

npm install
→ Installs dependencies
```

### `npm` vs `npx`?

```text
npm → manage/install packages
npx → execute packages/CLI tools
```

### Local vs global installation?

```text
Local  → project-specific
Global → system-wide
```

---

# Quick Revision

```text
NPM
│
├── npm init -y
│      → Create package.json
│
├── npm install
│      → Install dependencies
│
├── npm install <pkg>
│      → Install package
│
├── npm install <pkg> -D
│      → Install dev dependency
│
├── npm uninstall <pkg>
│      → Remove package
│
├── npm update
│      → Update packages
│
├── npm run <script>
│      → Run script
│
└── npx
       → Execute package/CLI
```

### ⭐ Remember these 6

```text
package.json       → Project configuration/dependencies
package-lock.json  → Exact dependency tree/versions
node_modules       → Installed packages
npm install        → Install
npm run            → Run scripts
npx                → Execute packages
```

const path = require('path')

console.log(path.sep)
const filePath=path.join(`/content/`,`DHiraj`,`subfolder`,`test.txt`)
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname,`content`,`subfoleder`,`text.txt`)
console.log(absolute)
const fs = require('fs');
let pkgStr = fs.readFileSync('package.json').toString();
let pkg = JSON.parse(pkgStr);
console.log(pkg);
pkg.info = 'test';
// fs.('package.json');
fs.writeFileSync('package.json', JSON.stringify(pkg,null,2));
 pkgStr = fs.readFileSync('package.json').toString();
 pkg = JSON.parse(pkgStr);
console.log(pkg);


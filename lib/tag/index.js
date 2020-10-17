/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/15 3:28 PM
 */
const fs = require('fs');
const JSON5 = require('json5');
const shell = require('shelljs');
const chalk = require('chalk');

let red = chalk.red;
let greenBright = chalk.greenBright;
let redBright = chalk.redBright;


const load = async ()=>{
  try {
    let pkgJson = JSON.parse(fs.readFileSync('package.json').toString());
    let version = pkgJson.version;
    if (!fs.existsSync('.git')) {
      console.log(red('.git not found at the level of package.json'));
      console.log(redBright('should run "rig tag" in the directory with both .git and package.json'));
      return;
    }
    shell.exec(`git tag ${version}`);
    console.log(greenBright(`tag:${version} created.`));
  }catch (e){
    console.log(red(e.message));
  }
}
module.exports = {
  load
}

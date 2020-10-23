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
const print = require('../print');
let red = chalk.red;
let greenBright = chalk.greenBright;
let redBright = chalk.redBright;


const load = async ()=>{
  try {
    let pkgJson = JSON.parse(fs.readFileSync('package.json').toString());
    let version = pkgJson.version;
    if (!fs.existsSync('.git')) {
      print.error('.git not found at the level of package.json');
      print.error('should run "rig tag" in the directory with both .git and package.json');
      return;
    }
    let statusProcess = shell.exit('git status');
    if (statusProcess.stdout.indexOf('nothing to commit')>=0) {
      shell.exec(`git tag ${version}`);
      print.error(`tag:${version} created.`);
    }else {
      print.error(statusProcess.stdout);
    }
  }catch (e){
    console.log(red(e.message));
  }
}
module.exports = {
  load
}

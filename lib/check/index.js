/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/14 6:59 PM
 */
const shell = require('shelljs');
const fs = require('fs');
const json5 = require('json5');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const utils = require('../utils');
const path = require('path');
let log = console.log;
let green = chalk.green;
let red = chalk.red;
let greenBright = chalk.greenBright;
const load = async ()=>{
  const spinner = ora('checking for production').start();
  try {
    let rigJson5Str = fs.readFileSync('package.rig.json5');
    let rigJson5 = json5.parse(rigJson5Str);
    console.log()
    for (let dep of rigJson5){
      if (dep.dev){
        spinner.fail(greenBright(`${dep.name} is in developing!\nUse correct version and set dev to false!`));
        process.exit(1);
      }
    }
    spinner.succeed(greenBright(`Ready for production!`));
  }catch (e){
    spinner.fail(greenBright(e.message));
    process.exit(1);

  }
}
module.exports = {
  name:'check',
  load
}


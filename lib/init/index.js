/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/9 6:14 PM
 */
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const json5 = require('json5');
const inquirer = require('inquirer');
const chalk = require('chalk');
let log = console.log;
let green = chalk.green;
let red = chalk.red;
let redBright = chalk.redBright;

let yellow = chalk.yellow;

//加载命令控制器

const load = async (cmd) => {
  try {
    console.log(chalk.blue('exec init'));
    //检查当前目录是否存在package.json
    if (!(fs.existsSync('package.json') && fs.lstatSync('package.json').isFile())) {
      console.log(chalk.red('Please run this in the root directory of project!Must have a validate package.json'));
      return;
    }
    //检查是否存在rigfile.json5
    if (fs.existsSync('rigfile.json5')) {
      console.log(chalk.green('rigfile.json5 already exists~'));
    } else {
      //创建rigfile.json5
      let rigfileObj = [];
      console.log(chalk.green('create rigfile.json5'));
      fs.writeFileSync('./rigfile.json5', json5.stringify(rigfileObj));
    }
    //检查rigs是否存在
    if (fs.existsSync('./rigs') && fs.lstatSync('./rigs').isDirectory()) {
      console.log(chalk.green('folder rigs  already exists~'));
    } else {
      console.log(chalk.green('create folder rigs'));
      fs.mkdirSync('rigs');
      fs.writeFileSync('rigs/.gitkeep', '')

    }
    //检查rigs_dev是否存在
    if (fs.existsSync('./rigs_dev') && fs.lstatSync('./rigs_dev').isDirectory()) {
      console.log(green('folder rigs_dev already exists~'));
    } else {
      console.log(green('create folder rigs_dev'));
      fs.mkdirSync('rigs_dev');
      fs.writeFileSync('rigs_dev/.gitkeep', '')
    }
    //填充gitignore
    let rigIgnoreStrArr = [
      'rigs/*',
      'rigs_dev/*',
      '!rigs/.gitkeep',
      '!rigs_dev/.gitkeep'
    ];
    let gitignoreStr = ''
    if (fs.existsSync('.gitignore')) {
      gitignoreStr = fs.readFileSync('.gitignore').toString();
      for (let i of rigIgnoreStrArr) {
        if (gitignoreStr.indexOf(i) > -1) {
          console.log(green(`${i} already in .gitignore`))
        } else {
          console.log(green(`append ${i} to .gitignore`));
          gitignoreStr += '\n' + i;
        }
      }
    } else {
      for (let i of rigIgnoreStrArr) {
        if (gitignoreStr.indexOf(i) > -1) {
          console.log(green(`${i} already in .gitignore`))
        } else {
          console.log(green(`append ${i} to .gitignore`));
          gitignoreStr += '\n' + i;
        }
      }
      fs.writeFileSync('.gitignore', gitignoreStr)
    }
    //modify package.json
    let pkgJSONStr = fs.readFileSync('./package.json').toString();
    let pkgJSON = JSON.parse(pkgJSONStr);
    let inserted = {
      private: false,
      workspace: [
        "rigs/*",
        "rigs_dev/*"
      ]
    }
    pkgJSON.private = inserted.private;
    if (pkgJSON.workspace && pkgJSON.workspace instanceof Array) {
      if (pkgJSON.workspace.indexOf('rigs/*')===-1) {
        pkgJSON.workspace.push('rigs/*')
      }
      if (pkgJSON.workspace.indexOf('rigs_dev/*')===-1) {
        pkgJSON.workspace.push('rigs_dev/*')
      }
    } else {
      pkgJSON.workspace = inserted.workspace
    }
    fs.writeFileSync('package.json', JSON.stringify(pkgJSON,null,2));
    log(green('package.json updated'))
  } catch (e) {
    log(redBright(e.message));
  }

}
module.exports = {
  name: 'init',
  load
}

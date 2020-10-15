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
    //检查是否存在package.rig.json5
    if (fs.existsSync('package.rig.json5')) {
      console.log(chalk.green('package.rig.json5 already exists~'));
    } else {
      //创建package.rig.json5.json5
      let rigJson5 = [];
      console.log(chalk.green('create package.rig.json5'));
      fs.writeFileSync('./package.rig.json5', json5.stringify(rigJson5));
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
    // if (fs.existsSync('./rigs_dev') && fs.lstatSync('./rigs_dev').isDirectory()) {
    //   console.log(green('folder rigs_dev already exists~'));
    // } else {
    //   console.log(green('create folder rigs_dev'));
    //   fs.mkdirSync('rigs_dev');
    //   fs.writeFileSync('rigs_dev/.gitkeep', '')
    // }
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
      private: true,
      workspaces: [
        "rigs/*",
        "rigs_dev/*"
      ],
      scripts:{
        preinstall:"rig preinstall",
        postinstall:"rig postinstall",
      }
    }
    pkgJSON.private = inserted.private;
    //初始化workspaces
    if (pkgJSON.workspaces && pkgJSON.workspaces instanceof Array) {
      if (pkgJSON.workspaces.indexOf('rigs/*')===-1) {
        pkgJSON.workspaces.push('rigs/*')
      }
      if (pkgJSON.workspaces.indexOf('rigs_dev/*')===-1) {
        pkgJSON.workspaces.push('rigs_dev/*')
      }

    } else {
      pkgJSON.workspaces = inserted.workspaces
    }
    //初始化pre/post-install
    if (pkgJSON.scripts && pkgJSON.scripts instanceof Object) {
      if (pkgJSON.scripts.preinstall) {
        pkgJSON.scripts.preinstall = `${pkgJSON.scripts.preinstall} && ${inserted.scripts.preinstall}`
      }else{
        pkgJSON.scripts.preinstall = inserted.scripts.preinstall;
      }
      if (pkgJSON.scripts.postinstall) {
        pkgJSON.scripts.postinstall = `${pkgJSON.scripts.postinstall} && ${inserted.scripts.postinstall}`
      }else{
        pkgJSON.scripts.postinstall = inserted.scripts.postinstall;
      }
    } else {
      pkgJSON.scripts = inserted.scripts
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

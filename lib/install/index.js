/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/9 6:14 PM
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

let redBright = chalk.redBright;

//加载命令控制器
const load = async (cmd) => {
  const spinner = ora('installing').start();
  try {
    //读取rigfile
    let rigfileStr = fs.readFileSync('rigfile.json5');
    let rigfile = json5.parse(rigfileStr);
    //重置rigs rigs_dev

    if (fs.existsSync('__rigs')) {
      shell.rm('-rf', '__rigs');
    }
    if (fs.existsSync('__rigs_dev')) {
      shell.rm('-rf', '__rigs_dev');
    }
    fs.mkdirSync('__rigs');
    fs.mkdirSync('__rigs_dev')
    fs.writeFileSync('__rigs/.gitkeep', '');
    fs.writeFileSync('__rigs_dev/.gitkeep', '');

    if (fs.existsSync('rigs')) {
      shell.rm('-rf', 'rigs');
    }
    if (fs.existsSync('rigs_dev')) {
      shell.rm('-rf', 'rigs_dev');
    }
    shell.exec('mv  __rigs rigs');
    shell.exec('mv  __rigs_dev rigs_dev');
    shell.chmod('777', 'rigs');
    shell.chmod('777', 'rigs_dev');


    //循环clone rigs中的库会删除.git
    for (let dep of rigfile) {
      let target = 'rigs'
      if (utils.regex.path.test(dep.source)) {
        target = 'rigs_dev'
      }
      //拉取库
      let cloneProcess = shell.exec(`git -c advice.detachedHead=false clone -b  ${dep.version} ${dep.source} ${target}/${dep.name}`,
        {silent: true}
      );
      if (cloneProcess.stderr && !fs.existsSync(`${target}/${dep.name}`)) {
        throw new Error(cloneProcess.stderr);
      }
      if (target === 'rigs') {
        shell.rm('-rf', `${target}/${dep.name}/.git`);
      }
      //soft link
      if (!fs.existsSync('node_modules')) {
        shell.mkdir('node_modules');
      }
      let rootPath = shell.pwd().stdout;
      if (fs.existsSync(`node_modules/${dep.name}`)) {
        shell.rm('-rf', `node_modules/${dep.name}`);
      }
      fs.symlinkSync(path.resolve(rootPath, `./${target}/${dep.name}`), path.resolve(rootPath, `./node_modules/${dep.name}`), 'dir');
    }

    //收尾
    if (fs.existsSync('__rigs')) {
      shell.rm('-rf', '__rigs');
    }
    if (fs.existsSync('__rigs_dev')) {
      shell.rm('-rf', '__rigs_dev');
    }
    spinner.succeed(greenBright('SUCCEED!'));
    //执行npm link
  } catch (e) {
    spinner.fail(redBright(e.message))
  }
}
module.exports = {
  name: 'install',
  load
}

/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/9 6:14 PM
 */
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
let greenBright = chalk.greenBright;

let redBright = chalk.redBright;
//加载命令控制器
const load = async (cmd) => {
  const spinner = ora('installing').start();
  try {
    shell.exec('yarn install');
    spinner.succeed(greenBright(`rig install SUCCEED!`));
    //执行npm link
  } catch (e) {
    spinner.fail(redBright(e.message))
  }
}
module.exports = {
  name: 'install',
  load
}

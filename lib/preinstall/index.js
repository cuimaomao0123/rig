/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/9 6:14 PM
 */
const shell = require('shelljs');
const fs = require('fs');
const json5 = require('json5');
const print = require('../print');
//加载命令控制器
const load = async (cmd) => {
  print.info('start rig preinstall');
  try {
    //读取package.rig.json5
    let rigJson5Str = fs.readFileSync('package.rig.json5');
    let rigJson5 = json5.parse(rigJson5Str);
    //重置rigs
    if (fs.existsSync('__rigs')) {
      shell.rm('-rf', '__rigs');
    }
    fs.mkdirSync('__rigs');
    fs.writeFileSync('__rigs/.gitkeep', '');
    if (fs.existsSync('rigs')) {
      shell.rm('-rf', 'rigs');
    }
    shell.exec('mv  __rigs rigs');
    shell.chmod('777', 'rigs');
    let target = 'rigs';
    let pkgJson = JSON.parse(fs.readFileSync('package.json').toString());
    let dependencies = pkgJson['dependencies'];
    for (let dep of rigJson5) {
      if (dep.dev) {
        //下载开发库
        //增加依赖预检
        print.info(`cloning ${dep.name}`);
        let cloneProcess = shell.exec(`git clone ${dep.source} ${target}/${dep.name}`,
          {silent: true}
        );
        if (cloneProcess.stderr && !fs.existsSync(`${target}/${dep.name}`)) {
          throw new Error(cloneProcess.stderr);
        }
      }
      dependencies[dep.name] = `git+ssh://${dep.source}#${dep.version}`
    }
    //覆盖package.json
    pkgJson.dependencies = dependencies;
    fs.writeFileSync('package.json', JSON.stringify(pkgJson, null, 2));

    //收尾
    if (fs.existsSync('__rigs')) {
      shell.rm('-rf', '__rigs');
    }
    print.succeed(`preinstall SUCCEED! Will do "yarn install"`);
    //远程链接设置完成，开发库设置完成，准备执行yarn install
  } catch (e) {
    print.error(e.message);
  }
}
module.exports = {
  name: 'install',
  load
}

/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/20 6:58 PM
 */
const shell = require('shelljs');
const fs = require('fs');
const json5 = require('json5');
const print = require('../print');
//加载命令控制器
const info = ()=>{
  print.info(`start checking modules`);
  let rigJson5 = json5.parse(fs.readFileSync('package.rig.json5'));
  for (let dep of rigJson5) {
    let describeProcess = shell.exec(`git ls-remote --tags --refs --sort="version:refname" ${dep.source} | awk -F/ 'END{print$NF}'`,
      {silent: true}
    );
    let remoteLatestTag = describeProcess.stdout.trim();
    if (dep.dev){
      print.warn(`[${dep.name}] is in developing. using:${dep.version},latest:${remoteLatestTag},`);
    }else{
      if (remoteLatestTag) {
        if (dep.version === remoteLatestTag) {
          print.info(`[${dep.name}] using:${dep.version},latest:${remoteLatestTag}`);
        } else {
          print.warn(`[${dep.name}] using:${dep.version},latest:${remoteLatestTag},Please confirm before updating!!!`);
        }
      } else {
        print.warn(`Get latest tag failed!Error:${describeProcess.stderr}`);
      }
    }
  }

}
const load = async (cmd) => {
  info();
}
module.exports = {
  load,
  info,
}

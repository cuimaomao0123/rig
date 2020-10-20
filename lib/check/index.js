/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/14 6:59 PM
 */
const shell = require('shelljs');
const fs = require('fs');
const json5 = require('json5');
const print = require('../print');

const load = async () => {
  print.info('start checking for production');
  try {
    let rigJson5Str = fs.readFileSync('package.rig.json5');
    let rigJson5 = json5.parse(rigJson5Str);
    for (let dep of rigJson5) {
      if (dep.dev) {
        print.error(`${dep.name} is in developing!\nUse correct version and set dev to false!`);
        process.exit(1);
      }
    }
    print.succeed(`Ready for production!`);
  } catch (e) {
    print.error(e.message);
    process.exit(1);

  }
}
module.exports = {
  name: 'check',
  load
}


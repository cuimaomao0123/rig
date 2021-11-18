/**
 * @ignore
 * @Description nothing
 * @author Wang Bo (ralwayne@163.com)
 * @date 2020/10/9 6:14 PM
 */
const fs = require('fs');
const json5 = require('json5');
//加载命令控制器
const load = async (cmd) => {
  const mode = process.argv[process.argv.length -1];
  const rigJson5 = json5.parse(fs.readFileSync('env.rig.json5'));
  const modeObj = rigJson5[mode];
  const keysArray = Object.keys(modeObj);
  const valuesArray = [];
  let content = "";
  for (let i = 0; i<keysArray.length; i++) {
    const key = keysArray[i];
    const value = modeObj[key];
    content += key + " = " + value + "\n"
  }
  fs.writeFile('./.env.rig', content, {flag: "w"}, err => {
    console.log(err);
  });

}
module.exports = {
  load
}

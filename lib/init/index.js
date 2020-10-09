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

//加载命令控制器

const load = async (cmd) => {
  try {
    console.log('exec init');
    //检查当前目录是否存在package.json
    if (!fs.existsSync('package.json')) {
      console.log('Please run this in the root directory of project!Must have a validate package.json');
      return;
    }
    //检查是否存在rigfile.json5
    if (fs.existsSync('rigfile.json5')) {
      console.log('rigfile.json5 already exists~');
    } else {
      //创建rigfile.json5
      let rigfileObj = [];
      console.log('create rigfile.json5');
      fs.writeFileSync('./rigfile.json5', json5.stringify(rigfileObj));
    }
    //检查rigs是否存在
    let rigsStat = fs.lstatSync('./rigs');
    if (rigsStat.isDirectory()) {
      console.log('folder rigs  already exists~');
    } else {
      console.log('create folder rigs');
      fs.mkdirSync('rigs');
      fs.writeFileSync('rigs/.gitkeep', '')

    }
    //检查rigs_dev是否存在
    let rigsDevStat = fs.lstatSync('./rigs_dev');
    if (rigsDevStat.isDirectory()) {
      console.log('folder rigs_dev  already exists~');
    } else {
      console.log('create folder rigs_dev');
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
      for (let i of rigIgnoreStrArr){
        if (gitignoreStr.indexOf(i)>-1){
          console.log(`${i} already in .gitignore`)
        }else{
          console.log(`append ${i} to .gitignore`);
          gitignoreStr += '\n' + i;
        }
      }
    } else {
      for (let i of rigIgnoreStrArr){
        if (gitignoreStr.indexOf(i)>-1){
          console.log(`${i} already in .gitignore`)
        }else{
          console.log(`append ${i} to .gitignore`);
          gitignoreStr += '\n' + i;
        }
      }
      fs.writeFileSync('.gitignore', gitignoreStr)
    }
    //modify package.json
    let pkgJSONStr = fs.readFileSync('./package.json').toString();
    let pkgJSON = JSON.parse(pkgJSONStr);
    let inserted = {
      private:false,
      workspace:[
        "rigs/*",
        "rigs_dev/*"
      ]
    }
    pkgJSON.private = inserted.private;
    if (pkgJSON.workspace && pkgJSON.workspace instanceof Array){
      if (pkgJSON.workspace.find('rigs/*')){
        pkgJSON.workspace.push('rigs/*')
      }
      if (pkgJSON.workspace.find('rigs_dev/*')){
        pkgJSON.workspace.push('rigs_dev/*')
      }
    }else{
      pkgJSON.workspace = inserted.workspace
    }
  } catch (e) {

  }

}
module.exports = {
  name: 'init',
  load
}

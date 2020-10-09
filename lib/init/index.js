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
  try{
    console.log('exec init');
    //检查当前目录是否存在package.json
    if (!fs.existsSync('package.json')){
      console.log('Please run this in the root directory of project!Must have a validate package.json');
      return;
    }
    //检查是否存在rigfile.json5
    if (fs.existsSync('rigfile.json5')){
      console.log('rigfile.json5 already exists!');
    }else{
      //创建rigfile.json5
      let rigfileObj = [];




    }
  }catch (e){

  }

}
module.exports = {
  name:'init',
  load
}

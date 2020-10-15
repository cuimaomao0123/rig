# rig

- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- Commands
  - [`rig init`](./commands/publish#readme)
  - [`rig install`](./commands/publish#readme)
  - [`rig preinstall`](./commands/publish#readme) **Using by npm's preinstall.No need to run this manually.**
  - [`rig postinstall`](./commands/publish#readme) **Using by npm's postinstall.No need to run this manually.**

##Getting started
Should install yarn first.Rig is using yarn workspace to do hoisting.

**1.init rig**

```shell script
npm i -g yarn 
yarn global add rigjs
rig init
```
package.rig.json5 will be added to your project's root.

**2.configuring package.rig.json5**
```json5
//dev is false by default
[
//  {
//    name: 'r-a',//module's name
//    source: 'git@git.domain.com:common/r-a.git',//module's source
//    version: '1.0.0',//Notice:this used as tag.module's version ,
//  },
  {
    name: 'r-b',
    source: 'git@git.domain.com:common/r-b.git',
    version: '1.0.0',
  },
  {
    name: 'r-c',
    source: 'git@git.domain.com:common/r-c.git',
    version: '1.0.0',
    dev: true
  }
]
```
**3.run install:**
```shell script
rig install
```
OR
```shell script
yarn install
```
**Result:**

r-b will be installed in node_modules.

r-c will be cloned to rigs/
## How it works

####package.rig.json5

Rig is inspired by cocoapods.
Not like those popular monorepo solutions,rig is a tool for organizing multi repos.
So rig create a file named "package.rig.json5".
Data in "package.rig.json5" can look like this:
```json5
//dev is false by default
//dev 默认为false
[
//  {
//    name: 'r-a',//module's name
//    source: 'git@git.domain.com:common/r-a.git',//module's source
//    version: '1.0.0',//Notice:this used as tag.module's version ,
//  },
  {
    name: 'r-b',
    source: 'git@git.domain.com:common/r-b.git',
    version: '1.0.0',
  },
  {
    name: 'r-c',
    source: 'git@git.domain.com:common/r-c.git',
    version: '1.0.0',
    dev: true
  }
]
```
package.rig.json5 has an array of modules.

So rig create a folder named "rigs".

When dev is true,the module will be cloned in rigs/**(using master branch)**.

And it gets automatically linked in node_modules.

####How rig modifies package.json

```javascript
//Rig will insert these to package.json
//Rig won't cover your preinstall or postinstall's  settings.Scripts and workspaces will be appended.
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
```


####Main Features

1. Created for modular architecture.
2. An organizer for multi repos.
3. You can develop and test your module within your project.Just set **dev** to true.
4. Using yarn workspace.
5. Automatically link your developing modules in rigs/.

**How to remove your modules**

Remove your modules from both package.json and package.rig.json5 then run **rig install** or **yarn install**.

//TODO:
rig check //if has dev:true then end shell
rig tag //using package.json version




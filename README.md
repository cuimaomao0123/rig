# rig

- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- Commands
  - [`rig init`](./commands/publish#readme)
  - [`rig install`](./commands/publish#readme)
  - [`rig preinstall`](./commands/publish#readme) **Using by npm's preinstall.No need to run this manually.**
  - [`rig postinstall`](./commands/publish#readme) **Using by npm's postinstall.No need to run this manually.**
- [Concepts](#concepts)
- [Lerna.json](#lernajson)
- [Global Flags](./core/global-options)
- [Filter Flags](./core/filter-options)

##Getting started
Should install yarn first.Rig is using yarn workspace to do hoisting.

**init**

```shell script
npm i -g yarn 
yarn global add rigjs
rig init
```
**config package.rig.json5**
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
result:r-b will be installed in node_modules.
r-c will be clone to 
## How it works
Rig is inspired by cocoapods.
Not like those popular monorepos solutions,rig is a tool for organizing multi repos.
So rig create a file named "package.rig.json5".
Data in "package.rig.json5" looks like this:
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
It contains modules that you want.

**Main Features**

1. rig is created for modular architecture.
2. rig is an organizer for multi repos.
3. you can develop and test your module within your project.Just set dev to true.
4. 




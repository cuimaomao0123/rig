const { Command } = require('commander');
const program = new Command();
const fs = require('fs');
program.command('init').action(require('../init').load);
program.command('install').action(require('../install').load);
program.command('i').action(require('../install').load);
program.command('publish').action(require('../publish').load);
program.command('p').action(require('../publish').load);
program.command('preinstall').action(require('../preinstall').load);
program.command('postinstall').action(require('../postinstall').load);
program.version(require('../../package.json').version,'-v');
program.parse(process.argv);


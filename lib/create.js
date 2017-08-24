const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const inquirer = require('inquirer');
const Handlebars = require('handlebars');

module.exports = function create(projectName, options) {
  const bPath = path.join(__dirname, '../boilerplates', options.demo ? 'demo' : 'basic');
  const pPath = path.join(process.cwd(), projectName);
  inquirer.prompt([
    {
      type: 'input',
      name: 'primaryColor',
      message: 'set the primary color code',
      default: function () {
        return '#239DE6';
      },
      validate: function(value) {
        var color = value.match(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/);
        if(color) {
          return true;
        }
        return 'please enter a color code';
      }
    }, {
      type: 'list',
      name: 'orientation',
      message: 'navigation menu orientation?',
      choices: ['vertical', 'horizontal']
    }, {
      type: 'confirm',
      name: 'autoInstall',
      message: 'npm install after the <project> created?',
      default: true
    }
  ]).then(function (answers) {
    // console.log(JSON.stringify(answers, null, '  '));return;
    // const spinner = ora(chalk.green(`Creating a new project at ${pPath}`)).start();
    console.log('\r');
    const spinner = ora(`Creating a new project at ${pPath}`).start();
    if(fs.existsSync(pPath)) {
      spinner.fail(chalk.red(`The directory already exists: ${pPath}`));
      process.exit(1);
    }
    fs.copy(bPath, pPath, function (err) {
      if (err){
        spinner.fail(chalk.red('Failed to create project:'));
        return console.error(err);
      }

      if(answers.primaryColor !== '#239DE6') {
        let file = path.join(pPath, 'antd.theme.js');
        fs.writeFileSync(file, fs.readFileSync(file, 'utf-8').replace('"@primary-color": "#239DE6",', `"@primary-color": "${answers.primaryColor}",`));
      }
      if(answers.orientation === 'horizontal') {
        let file = path.join(pPath, 'src/config/menu.js');
        fs.writeFileSync(file, fs.readFileSync(file, 'utf-8').replace('export const horizontal = false;', 'export const horizontal = true;'));
      }

      if(answers.autoInstall) {
        spinner.succeed(`Success: created project at ${pPath}`);
        console.log('   npm install ...');
        process.chdir(pPath);
        spawn.sync('npm', ['install'], { stdio: 'inherit' });
      } else {
        spinner.succeed(`Success: created project at ${pPath}`);
      }
      console.log(chalk.yellow(`
Inside that directory, you can run several commands:
  * npm start: Starts the development server.
  * npm run build: Bundles the app into dist for production.
      `));
      if(answers.autoInstall) {
        console.log('start app: ' + chalk.green(`cd ${projectName} && npm start`));
      } else {
        console.log('start app: ' + chalk.green(`cd ${projectName} && npm install && npm start`));
      }
    });
  });
}
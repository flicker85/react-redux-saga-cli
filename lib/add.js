const path = require('path');
const fs = require("fs");
const copy = require('fs-extra').copySync;
const Handlebars = require('handlebars');
const j = require('jscodeshift');
const transform  = require('./transform');
const ora = require('ora');
const chalk = require('chalk');

let spinner;

module.exports = function add(routeName) {
  spinner = ora(chalk.green('Create route <' + routeName + '> ...')).start();
  const cwd = process.cwd();
  checkCurrentPath(cwd);
  const componentName = routeName.replace(/^\w/, m => m.toUpperCase());
  const tplPath = path.join(__dirname, '../boilerplates/template');
  const from = {
    rc: path.join(tplPath, 'routeComponent'),
    route: path.join(tplPath, 'route.tpl'),
  }
  const to = {
    rc: path.join(cwd, `src/containers/${componentName}`),
    route: path.join(cwd, 'src/routes.js')
  }
  const data = {
    componentName,
    key: routeName.toLowerCase()
  };
  checkRoute(to.rc, to.route, data.key);
  try {
    createRouteCompoent(from.rc, to.rc, data);
    appendRoute(from.route, to.route, data);
  } catch(err) {
    spinner.fail(chalk.red('Failed to create route'));
    console.error(err);
  }
  spinner.succeed(`Success: created route at ${to.rc}`);
}

function checkCurrentPath(cwd) {
  const r = fs.existsSync(path.join(cwd, 'src/routes.js')) && fs.existsSync(path.join(cwd, 'src/containers'));
  if(!r) {
    spinner.warn(chalk.yellow('Please switch to the root of the current project.'));
    process.exit(1);
  }
}

function checkRoute(dest, routes, key) {
  if(fs.existsSync(dest)) {
    spinner.warn(chalk.yellow(`The directory already exists: ${dest}`));
    process.exit(1);
  }
  const r = j(fs.readFileSync(routes, 'utf-8'))
    .find(j.Property, { key: { type: 'Identifier', name: 'childRoutes' } })
    .find(j.Property, { key: { type: 'Identifier', name: 'path' }, value: { type: 'Literal', value: `/${key}` } }).size();
  if(r != 0) {
    spinner.warn(chalk.yellow(`the route <${key}> already exists: ${routes}`));
    process.exit(1);
  }
}

function createRouteCompoent(src, dest, data) {
  fs.mkdirSync(dest);
  (function run(src, dest) {
    let dir = fs.readdirSync(src);
    dir.forEach(file => {
      let _src = path.join(src, file);
      let _dest = path.join(dest, file);
      if(fs.statSync(_src).isDirectory()) {
        fs.mkdirSync(_dest);
        run(_src, _dest);
      } else {
        if(path.extname(file) === '.tpl') {
          let template = Handlebars.compile(fs.readFileSync(_src, 'utf-8'));
          fs.writeFileSync(_dest.replace(/.tpl$/, '.js'), template(data));
        } else {
          copy(_src, _dest);
        }
      }
    });
  })(src, dest);
}

function appendRoute(src, dest, data) {
  let template = Handlebars.compile(fs.readFileSync(src, 'utf-8'));
  let route = template(data);
  let routes = fs.readFileSync(dest, 'utf-8');
  let code = transform(routes, route);
  fs.writeFileSync(dest, code);
}
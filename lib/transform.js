const j = require('jscodeshift');

module.exports = function transform(routes, route) {
  const root = j(routes);
  const node = j(route).find(j.ObjectExpression).get(0).node;
  root
    .find(j.Property, { key: { type: 'Identifier', name: 'childRoutes' } })
    .find(j.ObjectExpression).at(-1)
    .insertAfter(node);
  return root.toSource();
}
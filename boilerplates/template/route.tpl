export default {
  path: '/{{key}}',
  getComponent(nextState, cb) {
    Promise.all([
      System.import(/* webpackChunkName: '{{key}}' */ './containers/{{componentName}}/redux/reducers'),
      System.import(/* webpackChunkName: '{{key}}' */ './containers/{{componentName}}/redux/sagas'),
      System.import(/* webpackChunkName: '{{key}}' */ './containers/{{componentName}}')
    ]).then(([reducer, sagas, component]) => {
      injectReducer('{{key}}', reducer.default);
      injectSagas(sagas.default);
      cb(null, component.default);
    }).catch(function(e) {console.log('load error')});
  }
}
import App from './containers/App';
import getAsyncInjectors from './utils/asyncInjectors';

export default function createRoutes(store) {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [{
    path: '/',
    component: App,
    onEnter: (nextState, replace, next) => {
      if(!store.getState().global.user.role) {
        replace('/login');
      }
      next();
    },
    indexRoute: {
      getComponent(nextState, cb) {
        Promise.all([
          System.import(/* webpackChunkName: 'home' */ './containers/Home/redux/reducers'),
          System.import(/* webpackChunkName: 'home' */ './containers/Home/redux/sagas'),
          System.import(/* webpackChunkName: 'home' */ './containers/Home')
        ]).then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);
          cb(null, component.default);
        }).catch(function(e) {console.error('load error.')});
      },
    },
    childRoutes: [{
      path: '/about',
      getComponent(nextState, cb) {
        System.import(/* webpackChunkName: "about" */ './containers/About').then(component => {
          cb(null, component.default);
        });
      },
    }, {
      path: '/table',
      getComponent(nextState, cb) {
        Promise.all([
          System.import(/* webpackChunkName: 'table' */ './containers/Table/redux/reducers'),
          System.import(/* webpackChunkName: 'table' */ './containers/Table/redux/sagas'),
          System.import(/* webpackChunkName: 'table' */ './containers/Table')
        ]).then(([reducer, sagas, component]) => {
          injectReducer('table', reducer.default);
          injectSagas(sagas.default);
          cb(null, component.default);
        }).catch(function(e) {console.log('load error')});
      }
    }]
  }, {
    path: '/login',
    getComponent(nextState, cb) {
      Promise.all([
        System.import(/* webpackChunkName: 'login' */ './containers/Login/redux/sagas'),
        System.import(/* webpackChunkName: 'login' */ './containers/Login')
      ]).then(([sagas, component]) => {
        injectSagas(sagas.default);
        cb(null, component.default);
      }).catch(function(e) {console.log('load error.')});
    },
  }];
}
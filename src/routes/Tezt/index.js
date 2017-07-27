import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'tezt',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Tezt = require('./containers/TeztContainer').default
      const reducer = require('./modules/tezt').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'whatever', reducer })

      /*  Return getComponent   */
      cb(null, Tezt)

    /* Webpack named bundle   */
    }, 'tezt')
  }
})

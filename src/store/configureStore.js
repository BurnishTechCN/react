// store, 处理所有的reducer, 整个应用只有一个
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import inspectorMiddleware from 'middleware/inspector';
import { DEBUG } from 'config';
import rootReducer from '../reducers';

export default function configureStore(initialState = {}, history) {
  // Add so dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = applyMiddleware(inspectorMiddleware, thunk, reduxRouterMiddleware);

  const createStoreWithMiddleware = compose(
    middleware,
    DEBUG &&
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  );
  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);
  return store;
}

// import devTools from 'remote-redux-devtools';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default function configureStore() {
  const middleware = [];
  middleware.push(thunk);
  const store = createStore(rootReducer, applyMiddleware(...middleware));
  return {store};
}

import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// import thunk from 'redux-thunk';

import rootSaga from './root-saga'

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//after midleware is called, here are the sagas we're gonna run 
sagaMiddleware.run(rootSaga)


export const persistor = persistStore(store);

export default { store, persistor };
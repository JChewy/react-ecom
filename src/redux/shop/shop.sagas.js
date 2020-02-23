//listens for every action of specific type we pass in 
//put is saga effect for creating actions
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();

        //call is the effect inside generator function that invokes the method
        //takes in method, second param is param to invoked function
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

        //put is saga effect to dispatch actions. only difference is we have to yield it
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}
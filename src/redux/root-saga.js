import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/users.sagas';

export default function* rootSaga(){
  yield all([
    call(fetchCollectionsStart),
    call(userSagas)
  ]);
}
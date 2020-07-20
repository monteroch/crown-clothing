import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/users.sagas';
import { cartSagas } from './cart/cart.sagas';
import { shopSagas } from './shop/shop.sagas';

export default function* rootSaga(){
  yield all([
    call(fetchCollectionsStart),
    call(cartSagas),
    call(userSagas),
    call(shopSagas)
  ]);
}
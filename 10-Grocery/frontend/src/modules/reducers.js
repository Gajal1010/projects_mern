import { combineReducers } from 'redux';
import productReducer from './product/productReducer';
import catalogReducer from './catalog/catalogReducer'
import cartReducer from './cart/cartReducer'
import userReducer from './user/userReducer'
import ordersReducer from './orders/ordersReducer'


const reducer = combineReducers({
  product: productReducer,
  catalog: catalogReducer,
  cart: cartReducer,
  user: userReducer,
  orders: ordersReducer
})

export default reducer;
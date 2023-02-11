import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "./cartActions"
import { addItemToCart, removeItemFromCart } from "./cartUtils";

  
const cartReducer = (
    state = { 
      cartItems: [

    ],
    shippingAddress:{}
  },
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        return {...state, cartItems: addItemToCart(state.cartItems, action.payload)}
      case CART_REMOVE_ITEM:
        return {...state, cartItems: removeItemFromCart(state.cartItems, action.payload)}
      case CART_CLEAR_ITEMS:
        return {
          ...state,
          cartItems: [],
        }
      case CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload
        }
      default:
        return state
    }
  }
  export default cartReducer
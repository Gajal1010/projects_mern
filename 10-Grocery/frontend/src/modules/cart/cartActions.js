
export const CART_ADD_ITEM = 'CART_ADD_ITEM';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const CART_CLEAR_ITEMS = 'CART_CLEAR_ITEMS';
export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS';

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }


  export const addToCart = (payload) => async (dispatch, getState) => {
  
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id: payload._id,
        name: payload.name,
        image: payload.image,
        price: payload.price,
        qty: payload.qty,
      },    })
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }

const cartInitialState = JSON.parse(localStorage.getItem('cart')) || []

const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
}

// update local storage with state for cart

const updateLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state))
}

const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action // actionPayload is the product
  
    switch (actionType) {
      case CART_ACTION_TYPES.ADD_TO_CART: {
        const { id } = actionPayload
        // la forma mas facil de agregar un item al carrito
        // check if the product is already in the cart
        const productInCart = state.findIndex((item) => item.id === id)
  
        if (productInCart >= 0) {
          // una forma con struturedClone
  
          const newState = structuredClone(state)
          newState[productInCart].quantity++
          updateLocalStorage(newState)
          return newState
        }
        const newState = [
          ...state,
          {
            ...actionPayload, // this is the product
            quantity: 1,
          },
        ]
        updateLocalStorage(newState)
        return newState
      }
      case CART_ACTION_TYPES.REMOVE_FROM_CART: {
        const { id } = actionPayload
        const newState = state.filter((item) => item.id !== id)
        updateLocalStorage(newState)
        return newState
      }
  
      case CART_ACTION_TYPES.CLEAR_CART: {
        updateLocalStorage([])
        return []
      }
    }
  
    return state
  }

  export {  cartReducer, cartInitialState, CART_ACTION_TYPES }
import React,{useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items:[],
    totalAmount:0
}

const cartReducer = (state,action) => {
    switch(action.type)
    {
        case 'ADD':
            const updatedItems  =  state.items.concat(action.item);
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        case "REMOVE":
            return
        default:
            return state;
    }

   
}

const CartProvider = (props) => {

    const [cartState,dispatch] = useReducer(cartReducer,defaultCartState)

    const addItemToCartHandler = item => {
        dispatch({type:"ADD",item:item})
    };
    const removeItemFromCartHandler = id => {
        dispatch({type:"REMOVE",id:id})
    }


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: (id) => removeItemFromCartHandler
    }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
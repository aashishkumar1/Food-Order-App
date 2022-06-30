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
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

            const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;
            if(existingCartItem)
            {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            else{
                updatedItems  =  state.items.concat(action.item);
            }
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        case "REMOVE":
            const existingcartItemIndex = state.items.findIndex(item => item.id === action.id)
            const existingItem = state.items[existingcartItemIndex];
            const updatedtotalAmount = state.totalAmount - existingItem.price;
            let updateditems;
            if(existingItem.amount === 1)
            {
                updateditems = state.items.filter(item => item.id !== action.id);
            }
            else{
                const updateditem = {...existingItem,amount:existingItem.amount-1};
                updateditems = [...state.items];
                updateditems[existingcartItemIndex] = updateditem;
            }

            return {
                items: updateditems,
                totalAmount: updatedtotalAmount
            }
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
        removeItem: removeItemFromCartHandler
    }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
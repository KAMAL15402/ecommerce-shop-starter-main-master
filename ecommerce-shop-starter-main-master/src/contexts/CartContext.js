import React, {createContext, useState, useEffect} from 'react';

//create context
export const CartContext = createContext();

const CartProvider = ({children}) => {
  //cart state
  const [cart, setCart] = useState([]);

  //item amount state
  const [itemAmount, setItemAmount] = useState(0);

  //total price state
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total= cart.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount;
    },0);
    setTotal(total);
  })
  //cart item

  //update item amount
  useEffect(() => {
    if(cart){
      const amount = cart.reduce((accumulator, currentItem)=>{
        return accumulator + currentItem.amount;
      },0);
      setItemAmount(amount);
    }
  });

  //add to cart
  const addToCart=(product, id)=>{
    const newItem = {...product, amount:1};

    //check if item is already in the cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    // console.log(cartItem);

    //if cart item  is already present in the cart 
    if(cartItem){
      const newCart = [...cart].map(item => {
        if(item.id === id){
          return {...item, amount: cartItem.amount+1};
        }
        else{
          return item;
        }
      });
      setCart(newCart);
    }
    else{
      setCart([...cart, newItem]);
    }

    // console.log(`${product.title} added to the cart`); 
  };
  // console.log(cart);


  //remove from cart



  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  //increase amount 
  const increaseAmount = (id) =>{
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem,id);
    // console.log(item);
    // console.log(`item ${id} amount increased`);
  };
  const removeFromCart = (id) =>{
    const newCart = cart.filter((item) => {
      return item.id!==id;
    });
    setCart(newCart);
  };
  //decrease amount
  const decreaseAmount = (id) => {
    // Find the index of the item in the cart array
    const index = cart.findIndex(item => item.id === id);
    // If the item is not found, return
    if (index === -1) return;
    // If the item is found, make a copy of the cart array
    const newCart = [...cart];
    // Decrease the amount of the item by one
    newCart[index].amount--;
    // If the amount becomes zero, remove the item from the array
    if (newCart[index].amount === 0) {
      newCart.splice(index, 1);
    }
    // Update the state of the cart with the new array
    setCart(newCart);
  };
  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total}}>
    {children}</CartContext.Provider>
    );
};

export default CartProvider;

export const addItemToCart = (cartItems, cartItemToAdd) => {

    //loops through cart array. possible future update to make
    //more efficient would be to use hashtable instead.
    //probably ok for now as cart is probably not going to be thousands of items large. 
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItem.id
    );

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}
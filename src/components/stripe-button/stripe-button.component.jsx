import React from 'react';

//actual button
import StripeCheckout from 'react-stripe-checkout';

//props
const StripeCheckoutButton = ({ price }) => {
    //stripe requires price in cents not dollars
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_gd086KhuVCRQZpDn8w8rmDPj00zhX0AAnX'


    //
    const onToken = token => {
        console.log(token)
        alert('payment succesful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Artificial Icons'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            //token is callback passed after payment
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
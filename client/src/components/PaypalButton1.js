import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2'
import { doPurchase } from '../actions/purchase';
import { connect } from 'react-redux';

function PaypalButton1({ doPurchase, totalPurchase }) {
    const paypalOptions = {
        clientId: 'AY7O6M0NDbBh3f6eaRpynKmm5v7KUgf6pWaKXJIr3UY0i10x5uPB9a6CmjUWlWD-jpZ8HWXJFuJq03fL',
        intent: 'capture'
    }
    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
        size: '25'
    }
    return(
        <div>
            <PayPalButton
                paypalOptions={paypalOptions}
                buttonStyles={buttonStyles}
                amount={totalPurchase/100}
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);
                    console.log(data)
                    doPurchase(data, totalPurchase/100)
                }}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    templates: state.purchase.cart.templates,
});
  
  
const mapDispatchToProps = (dispatch, ownProps) => ({
    doPurchase: (paymentId, total) => {
        dispatch(doPurchase(paymentId, total))
    },
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PaypalButton1);
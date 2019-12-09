import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux';
import { doPurchase } from '../actions/purchase';

function PaypalButton({ doPurchase, totalPurchase }) {
  const paypalOptions = {
    clientId: 'AY7O6M0NDbBh3f6eaRpynKmm5v7KUgf6pWaKXJIr3UY0i10x5uPB9a6CmjUWlWD-jpZ8HWXJFuJq03fL',
    intent: 'capture',
  };
  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };
  return (
    <div style={{ maxWidth: '200px' }}>
      <PayPalButton
        paypalOptions={paypalOptions}
        buttonStyles={buttonStyles}
        amount={totalPurchase / 100}
        onSuccess={(details, data) => {
          doPurchase(data, totalPurchase / 100);
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  templates: state.purchase.cart.templates,
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  doPurchase: async (paymentId, total) => {
    await dispatch(doPurchase(paymentId, total));
    ownProps.onFinish();
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaypalButton);

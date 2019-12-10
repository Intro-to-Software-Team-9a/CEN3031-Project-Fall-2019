import React from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { connect } from 'react-redux';
import { doPurchase } from '../actions/purchase';
import { paypalVars } from '../config/config';

function PaypalButton({ doPurchase, totalPurchase }) {
  const paypalOptions = {
    clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || paypalVars.paypal.clientId,
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

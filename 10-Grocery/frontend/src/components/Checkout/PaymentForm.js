import React, { useEffect, useState } from 'react';
import { Typography, Divider, Button } from '@material-ui/core';
import Review from './Review';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_SERVER } from '../../api';

const PaymentForm = ({ nextStep, backStep, cart, onOrder }) => {
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const history = useHistory();

  // runs whens it begins to load or when variables in the brackets change
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const paymentIntent = await Axios.post(`${API_SERVER}/api/order/payment`, {
        total: cart.totalPrice,
      });

      setClientSecret(paymentIntent.data.clientSecret);
    };

    getClientSecret();
  }, [cart]);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // do fancy stripe
    event.preventDefault();
    setProcessing(true);

    const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

        if (paymentIntent.error) {
          setError(paymentIntent.error.message);
          setProcessing(false);
          return;
        }

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        onOrder()
        history.replace('/orders');
    
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  return (
    <>
      <Review cart={cart} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit}>
        <CardElement
          onChange={handleChange}
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: '20px',
              },
            },
          }}
        />

        <Button
          style={{ marginTop: '1rem' }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={processing || disabled || succeded}
        >
          <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
        </Button>
        {/* Errors */}
        {error && <div>{error}</div>}
      </form>
    </>
  );
};
export default PaymentForm;

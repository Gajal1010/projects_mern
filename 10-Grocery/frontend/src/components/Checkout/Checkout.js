import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import useStyles from './styles';
import { createOrder } from '../../modules/orders/ordersActions';
import { saveShippingAddress } from '../../modules/cart/cartActions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(
  'pk_test_51HdgOmBXsMDmZZcdcipKQOkw32p3WdMC3ONXATNxB146Bkim5OMVP1POZq3Jtr6iJ7D43LqXPIe6qxi0YyRsnVLS00I6m90Xf9'
);
const steps = ['Shipping address', 'Payment details'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orders);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (cart.shippingAddress?.address) {
      setActiveStep(1);
    }
    // eslint-disable-next-line
  }, [history, success, cart.shippingAddress]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.fullname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    );
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} setShippingData={saveShippingAddress} />
    ) : (
      <Elements stripe={promise}>
        <PaymentForm
          nextStep={nextStep}
          backStep={backStep}
          onOrder={placeOrderHandler}
          cart={cart}
        />
      </Elements>
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {!!!cart.cartItems ? (
            <Typography variant="h4" align="center">
              Checkout
            </Typography>
          ) : (
            <>
              <Typography variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? <Confirmation /> : <Form />}
            </>
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;

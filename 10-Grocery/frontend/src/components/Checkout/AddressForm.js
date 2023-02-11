import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import FormInput from './CustomTextField';
import { saveShippingAddress } from '../../modules/cart/cartActions';

const AddressForm = ({ checkoutToken, nextStep }) => {
  const methods = useForm();
  const dispatch = useDispatch()
//   fullName, address1, email, city, zip, country
  const submitHandler = (data) => {
    dispatch(saveShippingAddress(data))
    nextStep()
  }
  return (
    <>
      <Typography variant="h6" gutterBottom>Shipping address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          <Grid container spacing={3}>
            <FormInput required name="fullName" label="Full name" />
            <FormInput required name="address" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="postalCode" label="Zip / Postal code" />
            <FormInput required name="state" label="State" />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  ); 
};
export default AddressForm;

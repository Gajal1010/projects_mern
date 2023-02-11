import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';

const Review = ({ cart }) => (
  <>
    <Typography variant="h6" gutterBottom>Order summary</Typography>
    <List disablePadding>
      {cart.cartItems.map((product) => (
        <ListItem style={{ padding: '10px 0' }} key={product.name}>
          <ListItemText primary={product.name} secondary={`Quantity: ${product.qty}`} />
          <Typography variant="body2">{product.price}</Typography>
        </ListItem>
      ))}
      <ListItem style={{ padding: '0px 0' }}>
        <ListItemText primary="Shipping" />
        <Typography variant="body2">
        {cart.shippingPrice}
        </Typography>
        </ListItem>
      <ListItem style={{ padding: '0px 0' }}>
        <ListItemText primary="Tax" />
        <Typography variant="body2">
        {cart.taxPrice}
        </Typography>
        </ListItem>
        <ListItem style={{ padding: '10px 0' }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
        
        <CurrencyFormat
              renderText={(value) => <span>{value}</span>}
              decimalScale={2}
              value={cart.totalPrice}
              displayType={'text'}
              thousandSperator={true}
              prefix={'$'}
            />
        </Typography>
      </ListItem>
    </List>
  </>
);
export default Review;

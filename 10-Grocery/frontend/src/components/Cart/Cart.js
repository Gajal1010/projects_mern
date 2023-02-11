import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {
  Badge,
  Drawer,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { CART_REMOVE_ITEM } from '../../modules/cart/cartActions';
import useToggle from '../../hooks/useToggle';
import styles from './Cart.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import PlusIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

export default function Header() {
  const [cartDrawer, setCartDrawer] = useToggle(false);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalPrice = () => {
    let allPrices = [];
    cartItems.map((prod) => allPrices.push(prod.price * prod.qty));
    let totalPrice = allPrices.reduce((n, k) => n + k);
    return totalPrice;
  };

  const history = useHistory()
  const removeItemFromCart = (item) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: item });
  };

  const pushCheckout = () => {
    history.push('/checkout')
    setCartDrawer()
  }

  const drawerWidth = '450px';
  const useStyles = makeStyles((theme) => ({
    drawerPaper: {
      [theme.breakpoints.between('xs', 'sm')]: {
        width: '100%',
      },
      // 760 over
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
      },
    },
    buttonColor: {
      color: '#43B02A',
      borderColor: '#43B02A',
    },
    checkoutButton: {
      color: '#FFF',
      backgroundColor: '#43B02A',
      width: '100%',
      height: '48px',
      fontWeight: '750',
      fontSize: '18px',
    },
  }));

  const classes = useStyles();

  const cartList = cartItems.map((prod) => (
    <div key={prod.id}>
      <div className={styles.product}>
        <div>
          <img className={styles.imgContain}  alt="Img" src={prod.image} />
        </div>
        <div className={styles.productDescription}>

              <Typography component="span" variant="body2" color="textPrimary">
              {`${prod.name}`}
              </Typography>
              <Typography component="span" variant="body2" color="textPrimary">
                Price :               {` ${prod.price}`}.00
              </Typography>
            </div>   
        <Button onClick={() => removeItemFromCart(prod)}>
          <PlusIcon style={{ color: '#43B02A' }} fontSize="small" />
        </Button>
        <div className={styles.itemQty}>{`${prod.qty}`}</div>
        <Button onClick={() => removeItemFromCart(prod)}>
          <RemoveIcon style={{ color: 'red' }} fontSize="small" />
        </Button>
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <IconButton
        aria-label="cart"
        variant="outlined"
        color="inherit"
        onClick={setCartDrawer}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={cartDrawer}
        onClose={setCartDrawer}
      >
        <div className={styles.cart}>
          <div className={styles.cartHeader}>
            <Typography component="h1" variant="h4">
              Shopping Cart
            </Typography>

            <Button
              variant="outlined"
              className={classes.buttonColor}
              startIcon={<CloseIcon />}
              onClick={setCartDrawer}
            >
              Close
            </Button>
          </div>
          <div className={styles.divider} />
          <List className={styles.listItem}>
            {cartList.length > 0 ? (
              cartList
            ) : (
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                No items in your shopping cart.
              </Typography>
            )}
          </List>
          <div className={styles.checkoutSection}>
            <div className={styles.subtotal}>
              <Typography component="p" variant="h5">
                <span>Subtotal : $ </span>
                {cartItems.length && totalPrice()}
                .00
              </Typography>
            </div>
            <div className={styles.checkout}>
              <Button
                size="medium"
                className={classes.checkoutButton}
                variant="contained"
                onClick={pushCheckout}
              >
                Go to Checkout
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

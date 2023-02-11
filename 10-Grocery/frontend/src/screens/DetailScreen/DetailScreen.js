import React from 'react';
import { Button, Typography } from '@material-ui/core';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useStyles, {ColorButton} from '../../components/Common/ColorButton'
const DetailScreen = ({
  image,
  price,
  name,
  desc,
  id,
  addItemCart,
  removeItemCart,
  handleClose
}) => {
  const classes = useStyles();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemInCart = cartItems.find((cartItem) => cartItem._id === id);

  return (
    <div className={styles.details}>
        <div style={{display: 'flex'}}> 
            <Button
              variant="outlined"
              style={{color: '#43B02A', borderColor: '#43B02A', flex: '.1'}}
              startIcon={<ArrowBackIcon />}
              onClick={handleClose}
              >
              Back
            </Button>
              </div>
      <div className={styles.productContainer}>
        <div className={styles.productPicture}>
          <img alt="product" className={styles.imgContain} src={image} />
        </div>

        <div className={styles.productDetail}>
          <Typography component="h1" variant="h4">
            {`${name}`}
          </Typography>
          <span className={styles.productPrice}>{`$${price}`}</span>
          <span className={styles.productDesc}>{`${desc}`}</span>

          {itemInCart ? (
                <div className={classes.buttonContainer}>
                <ColorButton
                  variant="contained"
                  color="primary"
                  className={classes.buttonSymbol}
                  onClick={addItemCart}
                >
                  +
                </ColorButton>
                <div className={classes.buttonText}>{itemInCart.qty}</div>
                <ColorButton
                  variant="contained"
                  color="primary"
                  className={classes.buttonSymbol}
                  onClick={removeItemCart}
                >
                  -
                </ColorButton>
              </div>
          ) : (
            <div className={classes.buttonContainer}>
              <ColorButton
                variant="contained"
                color="primary"
                className={classes.buttonSymbolCon}
                onClick={addItemCart}
                disableRipple 
              >
                Add To Cart
              </ColorButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
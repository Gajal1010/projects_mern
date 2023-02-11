import React, { useState } from 'react';
import styles from './CatalogListItem.module.scss';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Detailscreen from '../../screens/DetailScreen/DetailScreen';
import ModalCommon from '../Common/ModalCommon';
import useStyles, { ColorButton } from '../Common/ColorButton';
import CurrencyFormat from 'react-currency-format';

function CatalogListItem(props) {
  const { image, price, name, desc, id, addItemCart, removeItemCart } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const itemInCart = cartItems.find((cartItem) => cartItem._id === id);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={clsx(styles.catalogListItem, styles.flexOrder)}>
        <img
          alt="product"
          className={styles.productImg}
          src={image}
          onClick={handleOpen}
        />
        <div className={styles.productInfo}>
          <span className={styles.productPrice}>
            {' '}
            <CurrencyFormat
              renderText={(value) => <span>{value}</span>}
              decimalScale={2}
              value={price}
              displayType={'text'}
              thousandSperator={true}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </span>
          <span className={styles.productTitle}>{`${name}`}</span>
          <span className={styles.productDesc}>{`${desc}`}</span>
        </div>
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
              disableRipples
            >
              Add To Cart
            </ColorButton>
          </div>
        )}
      </div>
      <ModalCommon
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      >
        <Detailscreen
          handleClose={handleClose}
          image={image}
          price={price}
          name={name}
          desc={desc}
          id={id}
          addItemCart={addItemCart}
          removeItemCart={removeItemCart}
        />
      </ModalCommon>
    </>
  );
}

export default CatalogListItem;

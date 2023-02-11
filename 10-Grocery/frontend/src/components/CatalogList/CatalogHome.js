import React from 'react';
import CatalogListItem from './CatalogListItem';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, CART_REMOVE_ITEM } from '../../modules/cart/cartActions';
import useToggle from '../../hooks/useToggle';
import { IconButton, Snackbar, useMediaQuery, useTheme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual
} from "swiper/core";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

function CatalogList({filter}) {
  const dispatch = useDispatch();
  const catalogList = useSelector((state) => state.catalog);
  const { loading, catalog } = catalogList;
  const [openSnack, toggleOpenSnack] = useToggle(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const filterCatalogList = catalog.filter(item => item.tags.includes(filter))

  const handleAddItemToCart = (item) => {
    dispatch(addToCart(item));
    toggleOpenSnack();
  };
  const handleRemoveItemCart = (item) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: item });
  };

  const catalogListDisplay = filterCatalogList.map((prod, index) => (
    <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none" }}>
      <CatalogListItem
        id={prod._id}
        desc={prod.desc}
        image={prod.image}
        name={prod.name}
        price={prod.price}
        quantity={prod.quantity}
        key={prod._id}
        addItemCart={() => handleAddItemToCart(prod)}
        removeItemCart={() => handleRemoveItemCart(prod)}
      />
            </SwiperSlide>

  ));
  return (
    <>
      {!loading && (
    <div>
    <Swiper
      id="swiper"
      virtual
      slidesPerView={matches ? 5 : 2}
      // slidesPerColumn={2}
      // slidesPerColumnFill="row"
      spaceBetween={5}
      // slidesPerGroup={2}
      // autoplay
      // loop

    //   navigation
      // pagination
    >
    {catalogListDisplay}
    </Swiper>

    </div>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openSnack}
        autoHideDuration={3000}
        message={<span id="message-id">Added To Cart!</span>}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        action={[
          <IconButton
            onClick={toggleOpenSnack}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
        onClose={toggleOpenSnack}
      />
    </>
  );
}

export default CatalogList;

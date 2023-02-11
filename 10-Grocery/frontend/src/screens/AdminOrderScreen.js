import React from 'react';
import {
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useQuery } from 'react-query';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import { API_SERVER } from '../api';

// Fix SHopping cart for orders
const useStyles = makeStyles((theme) => ({
  imgContain: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
}));

const OrderScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const [page, setPage] = React.useState(1);
  const [postPerPage] = React.useState(3);

  const getMyOrders = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await Axios.get(`${API_SERVER}/api/order/all`, config);

    console.log(data, ' data')
    return data;
  };
  
  const { data, isLoading, isError } = useQuery('orders', getMyOrders);

  const ListOrders = () =>
    data
      .slice((page - 1) * postPerPage, page * postPerPage)
      .map((order) => <Order order={order} />);

  if (isLoading) return <CircularProgress />;
  if (!data) return <Box mt="5rem" justifyContent="center" alignContent="center">No order history!</Box>

  return (
    <Box mt="5rem">
      <Box display="flex">
        <Box ml={'auto'} mr="1rem">
          <Pagination
            page={page}
            onChange={(e, value) => setPage(value)}
            count={Math.ceil(data.length / postPerPage)}
            color="primary"
            showFirstButton
            showLastButton
            navigationVariant="text"
            size="small"
            defaultPage={1}
          />
        </Box>
      </Box>
      <ListOrders />

      {isError && (
        <Box display="flex" justifyContent="center" alignItems="center">
          Error:{' '}
        </Box>
      )}
    </Box>
  );
};

const Order = ({ order }) => (
  <>
    <Box
      display="flex"
      m="1rem 1rem 0 1rem"
      p="1rem 1.2rem"
      border="1px #ddd solid"
      bgcolor="#f6f6f6"
    >
      <Box flex=".2" style={{ color: '#565959' }}>
        <Box component="span" display="block">
          ORDER PLACED:
        </Box>
        <Box component="span" display="block">
          {moment(order.createdAt).format('YYYY/MM/DD HH:mm')}
        </Box>
      </Box>
      <Box flex=".2" style={{ color: '#565959' }}>
        <Box component="span" display="block">
          TOTAL:
        </Box>
        <Box component="span" display="block">
          <CurrencyFormat
            renderText={(value) => <span>{value}</span>}
            decimalScale={2}
            value={order.totalPrice}
            displayType={'text'}
            thousandSperator={true}
            prefix={'$'}
          />
        </Box>
      </Box>
      <Box flex=".4" style={{ color: '#565959' }}>
        <Box component="span" display="block">
          SHIP TO:
        </Box>
        <Box
          component="span"
          display="block"
        >{`${order.shippingAddress.address}`}</Box>
        <Box
          component="span"
          display="block"
        >{`${order.shippingAddress.city}, ${order.shippingAddress.state}`}</Box>
        <Box
          component="span"
          display="block"
        >{`${order.shippingAddress.postalCode}`}</Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        flex=".2"
        style={{ color: '#565959' }}
      >
        <Box component="span" display="block">
          Order #:
        </Box>
        <Box>
          <Box component="span" display="block">{`${order._id}`}</Box>
        </Box>
      </Box>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      m="0 1rem"
      p="1rem 1.2rem"
      border="1px #ddd solid"
    >
      {order.orderItems.map((item) => (
        <OrderItem item={item} />
      ))}
    </Box>
  </>
);

const OrderItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Box mr="1rem">
        <img className={classes.imgContain} src={item.image} />
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography component="span" variant="body2" color="textPrimary">
          {`${item.name}`}
        </Typography>
        <Typography component="span" variant="body2" color="textPrimary">
          Price :{' '}
          <CurrencyFormat
            renderText={(value) => <span>{value}</span>}
            decimalScale={2}
            value={item.price}
            displayType={'text'}
            thousandSperator={true}
            prefix={'$'}
          />
        </Typography>
        <Typography component="span" variant="body2" color="textPrimary">
          {`Quantity: ${item.qty}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderScreen;

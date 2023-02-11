import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CatalogHome from '../components/CatalogList/CatalogHome';
import { catalogListAsync } from '../modules/catalog/catalogActions';
import Skeleton from '@material-ui/lab/Skeleton';

export default function HomePage() {
  const dispatch = useDispatch();
  const catalogLoading = useSelector((state) => state.catalog.loading);

  useEffect(() => {
    dispatch(catalogListAsync());
  }, [dispatch]);
  return (
    <Box mt={10} mr={2} ml={2}>
      {catalogLoading ? (
        <Grid container wrap="nowrap">
          {Array.from(new Array(4)).map((item, index) => (
            <Box key={index} width={'25%'} marginRight={0.5} my={5}>
              <Skeleton variant="rect" width={'100%'} height={118} />
              <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="95%" />
              </Box>
            </Box>
          ))}
        </Grid>
      ) : (
        <Box>
          <Typography
            component="h1"
            variant="h4"
            style={{ color: '#43B02A', fontWeight: '600' }}
          >
            Vegetables
          </Typography>
          <CatalogHome filter={'vegetables'} />

          <Typography
            component="h1"
            variant="h4"
            style={{ color: '#43B02A', fontWeight: '600' }}
          >
            Fruits
          </Typography>
          <CatalogHome filter={'fruits'} />

          <Typography
            component="h1"
            variant="h4"
            style={{ color: '#43B02A', fontWeight: '600' }}
          >
            Meat
          </Typography>
          <CatalogHome filter={'meat'} />
          <Typography
            component="h1"
            variant="h4"
            style={{ color: '#43B02A', fontWeight: '600' }}
          >
            Dairy
          </Typography>
          <CatalogHome filter={'dairy'} />
          <Typography
            component="h1"
            variant="h4"
            style={{ color: '#43B02A', fontWeight: '600' }}
          >
            Frozen
          </Typography>
          <CatalogHome filter={'frozen'} />
          <Typography
            component="h1"
            variant="h4"
            style={{ color: '#43B02A', fontWeight: '600' }}
          >
            Pantry
          </Typography>
          <CatalogHome filter={'pantry'} />
        </Box>
      )}
    </Box>
  );
}

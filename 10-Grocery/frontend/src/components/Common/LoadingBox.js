import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import { CircularProgress } from '@material-ui/core';

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',  flexDirection:'column',   color: '#43B02A', marginTop: '5rem'
  }
}));

const ProgressButton = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <CircularProgress
      role='status'
      style={{
        width: '100px',
        height: '100px',
        display: 'block',
        color: '#43B02A',
      }}
    ></CircularProgress>
    <div>Loading</div>
    </div>
  );
};

export default ProgressButton;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// components
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'inline-block',
    width: ({ fullWidth }) => (fullWidth ? '100%' : 'initial'),
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    height: '3px',
  },
}));

const ProgressButton = ({ fullWidth, isLoading, disabled, children, ...rest }) => {
  const classes = useStyles({ fullWidth });

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress className={classes.progress} />}
      <Button fullWidth disabled={disabled || isLoading} {...rest}>
        {children}
      </Button>
    </div>
  );
};

export default ProgressButton;
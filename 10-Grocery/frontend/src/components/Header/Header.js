import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart/Cart';
import { logout } from '../../modules/user/userActions';
import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecorationLine: 'none',
  },
  header: {
    backgroundColor: '#fff',
    color: '#43B02A',
    boxShadow: '0px 0px 0px 0px',
  },
}));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user);
  const { userInfo } = userLogin;
  const history = useHistory()

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, isAdmin) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    isAdmin ? history.push('/adminorders') : history.push('/orders')
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.header}>
        <Toolbar>

          <Typography
            component={NavLink}
            to={'/'}
            color="inherit"
            variant="h6"
            className={classes.title}
          >
            GroceryGo
          </Typography>
          <div>
            {userInfo ? (
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
              >
                My Account
              </Button>
            ) : (
              <Button component={NavLink} color="inherit" to={'/login'}>
                Login
              </Button>
            )}
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                        style={{color: '#43B02A'}}
                      >
                        <MenuItem onClick={handleClose}>My Orders</MenuItem>
                        {userInfo?.status === 'admin' &&  <MenuItem onClick={() => handleClose(true)}>All Orders</MenuItem> }
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <Cart />
        </Toolbar>
      </AppBar>
    </div>
  );
}

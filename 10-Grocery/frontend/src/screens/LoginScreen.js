import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginSchema } from '../utils/AuthValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../modules/user/userActions';
import LoadingBox from '../components/Common/LoadingBox';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const userLogin = useSelector((state) => state.user);
  const { loading, error, userInfo } = userLogin;

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });
  
  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      push('/');
    }
  }, [userInfo, push]);


  return (
    <Container component="main" maxWidth="xs">
      {loading ? (
        <LoadingBox />
      ) : (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <FormControlLabel
              control={
                <Controller
                  as={Checkbox}
                  control={control}
                  name="remember"
                  color="primary"
                  defaultValue={false}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}{' '}
    </Container>
  );
}

import Button from '@material-ui/core/Button';
import {
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';


export const ColorButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    boxShadow: 'none',
    backgroundColor: '#43B02A',
    '&:hover': {
      backgroundColor: '#43B02A',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  buttonContainer: {
    display: 'flex',
    backgroundColor: '#43B02A',
    borderRadius: '24px',
    marginTop: '1rem',
  },
  buttonSymbol: {
    flex: '.3',
    borderRadius: '24px',
  },
  buttonSymbolCon: {
    flex: '1',
    borderRadius: '24px',
  },
  buttonText: {
    flex: '.4',
    borderRadius: '24px',
    display: 'flex',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextCenter: {
    flex: '1',
    borderRadius: '24px',
    display: 'flex',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 16px',
    fontSize: '0.875rem',
    minWidth: '64px',
    height: '36px',
  },
}));

export default useStyles
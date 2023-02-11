/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Box,
  Card,
} from "@material-ui/core";
import React, { useState } from "react";
import { onWithdraw } from "./Functions";
import { currencyTypes } from "./utils/CurrencyConversion";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 *
 * Withdrawal form component
 * @export
 * @param {*} props
 * @returns
 */
export default function WithdrawForm(props) {
  const classes = useStyles();
  const [fromAccount, setfromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(null);

  /**
   *
   * @param {*} fromAccount
   * @param {*} amount
   * @param {*} currency
   */
  const onWithdrawClick = (fromAccount, amount, currency) => {
    onWithdraw(fromAccount, amount, currency, props.onSuccess);
  };

  return (
    <Card elevation={3} style={{ marginTop: "10%", padding: 20 }}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Withdrawal Form
      </Typography>
      <Box
        component="div"
        display="inline"
        justifyContent="center"
        width="100%"
      >
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">From Acc</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fromAccount}
            onChange={(event) => setfromAccount(event.target.value)}
          >
            {props.userAcounts.map((row, index) => (
              <MenuItem value={row.account_number}>
                {row.account_number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Currency</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <MenuItem value={currencyTypes.CAD}>{currencyTypes.CAD}</MenuItem>
            <MenuItem value={currencyTypes.USD}>{currencyTypes.USD}</MenuItem>
            <MenuItem value={currencyTypes.MXN}>{currencyTypes.MXN}</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Enter the Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          style={{ marginHorizontal: 20, marginTop: 20 }}
          onClick={(e) => onWithdrawClick(fromAccount, amount, currency)}
        >
          {"Withdraw"}
        </Button>
      </Box>
    </Card>
  );
}

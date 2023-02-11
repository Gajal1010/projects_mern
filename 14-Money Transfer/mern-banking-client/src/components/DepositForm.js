/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import {
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { onDeposit } from "./Functions";
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
 * Deposit form component
 * @export
 * @param {*} props - userAcounts ( array of accounts stored per user)
 * @returns
 */
export default function DepositForm(props) {
  const classes = useStyles();
  const [fromAccount, setfromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(null);

  /**
   *
   *
   * @param {*} toAccount
   * @param {*} amount
   * @param {*} currency
   */
  const onDepositClick = (toAccount, amount, currency) => {
    onDeposit(toAccount, amount, currency, props.onSuccess);
  };

  return (
    <Card elevation={3} style={{ marginTop: "10%", padding: 20 }}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Deposit Form
      </Typography>
      <Box
        component="div"
        display="inline"
        justifyContent="center"
        width="100%"
      >
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">To Acc</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={toAccount}
            onChange={(event) => setToAccount(event.target.value)}
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
          onClick={(e) => onDepositClick(toAccount, amount, currency)}
        >
          {"Deposit"}
        </Button>
      </Box>
    </Card>
  );
}

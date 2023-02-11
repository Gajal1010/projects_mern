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
import axios from "axios";
import React, { useState } from "react";
import apiConfig from "../apiConfig.json";
import { performTransfer } from "./Functions";
import { currencyTypes } from "./utils/CurrencyConversion";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/**
 *
 * Transfer form component
 * @export
 * @param {*} props
 * @returns
 */
export default function TransferForm(props) {
  const classes = useStyles();
  const [fromAccount, setfromAccount] = useState(null);
  const [toAccount, setToAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(null);

  /**
   *
   * @param {*} fromAccount
   * @param {*} toAccount
   * @param {*} amount
   * @param {*} currency
   */
  const validateAndTransfer = (fromAccount, toAccount, amount, currency) => {
    /**
     * validates and receives the account details
     */
    axios
      .get(apiConfig.ENDPOINT + "/account/" + toAccount)
      .then((res) => {
        if (res && res.status === 200) {
          performTransfer(
            fromAccount,
            toAccount,
            amount,
            currency,
            props.onSuccess
          );
        } else {
          alert("Invalid Account number . Please try again.");
        }
      })
      .catch((err) => {
        console.log("Error while validating data");
      });
  };

  return (
    <Card elevation={3} style={{ marginTop: "10%", padding: 20 }}>
      <Typography variant="h6" style={{ textAlign: "center" }}>
        Transfer Form
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
          <TextField
            id="outlined-basic"
            label="Recepient Acc.No"
            variant="outlined"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          />
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
          onClick={(e) =>
            validateAndTransfer(fromAccount, toAccount, amount, currency)
          }
        >
          {"Transfer"}
        </Button>
      </Box>
    </Card>
  );
}

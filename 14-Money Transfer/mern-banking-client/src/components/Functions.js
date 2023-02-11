/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import axios from "axios";
import apiConfig from "../apiConfig.json";
import {
  convertionTypes,
  currencyConvert,
  currencyTypes,
} from "./utils/CurrencyConversion";

/**
 *
 * @param {*} loggedInUsercustomerId - logged in user's unique id(customer id)
 * @param {*} onSuccess - Success call back once the login is success
 */
export const onLogin = (loggedInUsercustomerId, onSuccess) => {
  return axios
    .get(apiConfig.ENDPOINT + "/" + loggedInUsercustomerId)
    .then((res) => {
      console.log("res", res);
      if (res) {
        onSuccess(res);
      } else {
        alert("Enter valid Details! ");
      }
    })
    .catch((err) => {
      console.log("Error while fetching data");
    });
};

/**
 *
 * @param {*} toAccount - destination account number
 * @param {*} amount - Amount to deposit
 * @param {*} currency - currency type (CAD / MXN / USD)
 * @param {*} onSuccess - Success call back once the deposit is success
 */
export const onDeposit = (toAccount, amount, currency, onSuccess) => {
  /** Adding deposit amount to available balance */
  let CADAmount = amount;
  /** Convert currency to CAD before depositing */
  if (currency !== currencyTypes.CAD) {
    CADAmount = currencyConvert(
      currency === currencyTypes.MXN
        ? convertionTypes.MXNtoCAD
        : currency === currencyTypes.USD
        ? convertionTypes.USDtoCAD
        : null,
      CADAmount
    );
  }

  return axios
    .post(apiConfig.ENDPOINT + "/update/" + toAccount, {
      account_balance: CADAmount,
    })
    .then((res) => {
      if (res && res.status === 200) {
        alert("Deposited");
        onSuccess();
        return true;
      } else {
        alert("Enter valid Details! ");
        return false;
      }
    })
    .catch((err) => {
      console.log("Error while fetching data");
    });
};

/**
 *
 * @param {*} fromAccount - Account number of the sender
 * @param {*} toAccount - Account number of the receiver
 * @param {*} amount - amount to transfer
 * @param {*} currency - currency type (CAD / MXN / USD)
 * @param {*} onSuccess - Success call back once the transfer is success
 */
export const performTransfer = (
  fromAccount,
  toAccount,
  amount,
  currency,
  onSuccess
) => {
  /** Convert currency to CAD before doing the transaction */
  let CADAmount = amount;
  if (currency !== currencyTypes.CAD) {
    CADAmount = currencyConvert(
      currency === currencyTypes.MXN
        ? convertionTypes.MXNtoCAD
        : currency === currencyTypes.USD
        ? convertionTypes.USDtoCAD
        : null,
      CADAmount
    );
  }

  return axios
    .get(apiConfig.ENDPOINT + "/account/" + fromAccount)
    .then((res) => {
      if (res && res.status === 200) {
        let avaialableBalance = res.data[0].account_balance.$numberDecimal;
        if (
          avaialableBalance &&
          Number(avaialableBalance) < Number(CADAmount)
        ) {
          alert("No sufficient Balance to do this Transfer!");
        } else {
          /**Api to update db */
          axios
            .post(apiConfig.ENDPOINT + "/update/" + fromAccount, {
              account_balance: -Number(CADAmount),
            })
            .then((res) => {
              if (res && res.status === 200) {
                axios
                  .post(apiConfig.ENDPOINT + "/update/" + toAccount, {
                    account_balance: Number(CADAmount),
                  })
                  .then((res) => {
                    if (res && res.status === 200) {
                      onSuccess();
                      return true;
                    } else {
                      alert("Some error occured !");
                      return false;
                    }
                  })
                  .catch((err) => {
                    console.log("Error while fetching data", err);
                  });
              } else {
                alert("Enter valid Details! ");
              }
            })
            .catch((err) => {
              console.log("Error while fetching data", err);
            });
        }
      } else {
        alert("Enter valid Details! ");
      }
    })
    .catch((err) => {
      console.log("Error while fetching data");
    });
};

/**
 *
 * @param {*} fromAccount - Account number of the sender
 * @param {*} amount - amount to transfer
 * @param {*} currency - currency type (CAD / MXN / USD)
 * @param {*} onSuccess - Success call back once the transfer is success
 */
export const onWithdraw = (fromAccount, amount, currency, onSuccess) => {
  let CADAmount = amount;
  /** Convert currency to CAD before withdrawal */
  if (currency !== currencyTypes.CAD) {
    CADAmount = currencyConvert(
      currency === currencyTypes.MXN
        ? convertionTypes.MXNtoCAD
        : currency === currencyTypes.USD
        ? convertionTypes.USDtoCAD
        : null,
      CADAmount
    );
  }
  return axios
    .get(apiConfig.ENDPOINT + "/account/" + fromAccount)
    .then((res) => {
      if (res && res.status === 200) {
        let avaialableBalance = res.data[0].account_balance.$numberDecimal;
        if (
          avaialableBalance &&
          Number(avaialableBalance) < Number(CADAmount)
        ) {
          alert("No sufficient Balance to do this Winthdrawal!");
        } else {
          axios
            .post(apiConfig.ENDPOINT + "/update/" + fromAccount, {
              account_balance: -Number(CADAmount),
            })
            .then((res) => {
              if (res && res.status === 200) {
                alert("Withdrawal Successful!");
                onSuccess();
                return true;
              } else {
                alert("Enter valid Details! ");
                return false;
              }
            })
            .catch((err) => {
              console.log("Error while fetching data");
            });
        }
      }
    })
    .catch((err) => {
      console.log("Err", err);
    });
};

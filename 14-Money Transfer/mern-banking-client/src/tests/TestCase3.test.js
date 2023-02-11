/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import React from "react";
import axios from "axios";
import {
  performTransfer,
  onDeposit,
  onWithdraw,
} from "../components/Functions";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HomePage from "../components/HomePage";

window.alert = jest.fn();
configure({ adapter: new Adapter() });
//*Joe Swanson Customer ID: 002 Account Number: 5500

const wrapper = shallow(<HomePage />);
describe("Checking transaction status before Withdrawal", () => {
  test("Expecting homepage transaction status to be false", () => {
    expect(wrapper.state("transactionSuccess")).toBe(false);
  });
});
test("Initializing Joe Swanson's available balance set to 7425 ", () => {
  wrapper.setState({
    loggedIn: true,
    loggedInUseraccountData: [
      {
        account_balance: { $numberDecimal: "7425" },
        account_number: "1010",
        account_type: "checking",
        customer_id: "002",
        customer_name: "Joe Swanson",
      },
      {
        account_balance: { $numberDecimal: "15000" },
        account_number: "5500",
        account_type: "checking",
        customer_id: "002",
        customer_name: "Joe Swanson",
      },
    ],
    loggedInUsercustomerId: "002",
    loggedInUserpassword: "1",
    showDeposit: false,
    showTransfer: false,
    showWithdraw: false,
    transactionSuccess: false,
  });
});

describe("TEST CASE 3 a: GJoe Swanson withdraws $5,000.00 CAD from account number 5500.", () => {
  test("Begin Withdrawal from account 2001", () => {
    expect(
      onWithdraw(
        "5500",
        5000,
        "CAD",
        wrapper.setState({ transactionSuccess: true, showWithdraw: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Withdrawal success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

describe("TEST CASE 3 b: Joe Swanson transfers $7,300.00 CAD from account number 1010 to account number 5500.", () => {
  test("Perform Withdrawal from account 2001.", () => {
    expect(
      performTransfer(
        "1010",
        "5500",
        7300,
        "CAD",
        wrapper.setState({ transactionSuccess: true, showTransfer: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Transfer success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

describe("TEST CASE 3 c: Joe Swanson deposits $13,726.00 MXN to account number 1010.", () => {
  test("Perform Deposit to account 2001", () => {
    expect(
      onDeposit(
        "1010",
        13726,
        "MXN",
        wrapper.setState({ transactionSuccess: true, showDeposit: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Deposit success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

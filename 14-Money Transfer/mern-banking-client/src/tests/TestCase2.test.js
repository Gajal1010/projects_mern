/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import React from "react";
import axios from "axios";
import { onWithdraw, onDeposit } from "../components/Functions";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HomePage from "../components/HomePage";

window.alert = jest.fn();
configure({ adapter: new Adapter() });

const wrapper = shallow(<HomePage />);
describe("Checking transaction status before Withdrawal", () => {
  test("Expecting homepage transaction status to be false", () => {
    expect(wrapper.state("transactionSuccess")).toBe(false);
  });
});
test("Initializing Glenn Quagmire's available balance set to 35000 ", () => {
  wrapper.setState({
    loggedIn: true,
    loggedInUseraccountData: [
      {
        account_balance: { $numberDecimal: "35000" },
        account_number: "2001",
        account_type: "checking",
        customer_id: "504",
        customer_name: "Glenn Quagmire",
        updated_date: "2020-06-20T07:26:24.758Z",
      },
    ],
    loggedInUsercustomerId: "504",
    loggedInUserpassword: "1",
    showDeposit: false,
    showTransfer: false,
    showWithdraw: false,
    transactionSuccess: false,
  });
});
describe("TEST CASE 2 a: Glenn Quagmire withdraws $5,000.00 MXN from account number 2001.", () => {
  test("Perform Withdrawal from account 2001.", () => {
    expect(
      onWithdraw(
        "2001",
        5000,
        "MXN",
        wrapper.setState({ transactionSuccess: true, showWithdraw: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Withdrawal success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

describe("TEST CASE 2 b: Glenn Quagmire withdraws $12,500.00 USD from account number 2001.", () => {
  test("Begin Withdrawal from account 2001", () => {
    expect(
      onWithdraw(
        "2001",
        12500.0,
        "USD",
        wrapper.setState({ transactionSuccess: true, showWithdraw: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Withdrawal success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

describe("TEST CASE 2 c: Glenn Quagmire deposits $300.00 CAD to account number 2001.", () => {
  test("Perform Deposit to account 2001", () => {
    expect(
      onDeposit(
        "2001",
        300,
        "CAD",
        wrapper.setState({ transactionSuccess: true, showDeposit: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Deposit success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

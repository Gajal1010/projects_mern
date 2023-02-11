/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import React from "react";
import axios from "axios";
import {
  performTransfer,
  onWithdraw,
  onDeposit,
} from "../components/Functions";
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
test("Initializing Peter Griffin's available balance set to 150 ", () => {
  wrapper.setState({
    loggedIn: true,
    loggedInUseraccountData: [
      {
        account_balance: { $numberDecimal: "150" },
        account_number: "0123",
        account_type: "checking",
        customer_id: "123",
        customer_name: "Peter Griffin",
      },
    ],
    loggedInUsercustomerId: "123",
    loggedInUserpassword: "1",
    showDeposit: false,
    showTransfer: false,
    showWithdraw: false,
    transactionSuccess: false,
  });
});

describe("TEST CASE 4 a: Peter Griffin withdraws $70.00 USD from account number 0123.", () => {
  test("Begin Withdrawal from account 0123", () => {
    expect(
      onWithdraw(
        "0123",
        70,
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

test("Initializing Lois  Griffin's available balance set to 65000 ", () => {
  wrapper.setState({
    loggedIn: true,
    loggedInUseraccountData: [
      {
        account_balance: { $numberDecimal: "150" },
        account_number: "0456",
        account_type: "checking",
        customer_id: "456",
        customer_name: "Lois Griffin",
      },
    ],
    loggedInUsercustomerId: "456",
    loggedInUserpassword: "1",
    showDeposit: false,
    showTransfer: false,
    showWithdraw: false,
    transactionSuccess: false,
  });
});

describe("TEST CASE 4 b: Lois Griffin deposits $23,789.00 USD to account number 0456.", () => {
  test("Perform Deposit to account 0456", () => {
    expect(
      onDeposit(
        "0456",
        23789,
        "USD",
        wrapper.setState({ transactionSuccess: true, showDeposit: false })
      )
    ).toBeTruthy();
  });
  window.alert.mockClear();
  test("Deposit success and transaction status in home page should be true", () => {
    expect(wrapper.state("transactionSuccess")).toBe(true);
  });
});

describe("TEST CASE 4 c: Lois Griffin transfers $23.75 CAD from account number 0456 to Peter Griffin (account number 0123).", () => {
  test("Perform Withdrawal from account 2001.", () => {
    expect(
      performTransfer(
        "0456",
        "0123",
        23.75,
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

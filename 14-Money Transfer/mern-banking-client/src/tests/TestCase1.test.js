/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import React from "react";
import axios from "axios";
import { onDeposit } from "../components/Functions";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import HomePage from "../components/HomePage";

window.alert = jest.fn();
configure({ adapter: new Adapter() });

const wrapper = shallow(<HomePage />);
describe("Checking transaction status before Deposit", () => {
  test("Expecting homepage transaction status to be false", () => {
    expect(wrapper.state("transactionSuccess")).toBe(false);
  });
});

test("Initializing Stewie Griffin's available balance set to 100 ", () => {
  wrapper.setState({
    loggedIn: true,
    loggedInUseraccountData: [
      {
        account_balance: { $numberDecimal: "100" },
        account_number: "1234",
        account_type: "checking",
        customer_id: "777",
        customer_name: "Stewie Griffin",
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

describe("TEST CASE 1: Stewie Griffin deposits $300.00 USD to account number 1234.", () => {
  test("Perform Deposit to account 1234", () => {
    expect(
      onDeposit(
        "1234",
        300,
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

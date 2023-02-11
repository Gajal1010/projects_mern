/**
 * @author Shri Nandhini J R
 * @email shrinandhini2801@gmail.com
 */
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import apiConfig from "../apiConfig.json";

/**
 *
 * This component displays the updated details of all accounts from MongoDb
 * @class ShowCustomerDetails
 * @extends {Component}
 */
class ShowCustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    };
  }

  componentDidMount() {
    axios
      .get(apiConfig.ENDPOINT + "/")
      .then((res) => {
        this.setState({
          customers: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from showCustomerDetails");
      });
  }

  render() {
    const { customers } = this.state;
    return (
      <>
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginTop: "5%" }}
        >
          Updated Customer Database
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#eaeaea" }}>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Customer Id</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell align="right">Account Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: "#f0f8ff" }}>
              {customers &&
                customers.map((row, index) => (
                  <TableRow key={row.customer_id + "-" + index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.customer_id}
                    </TableCell>
                    <TableCell>{row.customer_name}</TableCell>
                    <TableCell>{row.account_number}</TableCell>
                    <TableCell>{row.account_type}</TableCell>
                    <TableCell align="right">
                      {row.account_balance.$numberDecimal}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default ShowCustomerDetails;

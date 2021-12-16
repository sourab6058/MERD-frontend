import React, { useState, useEffect } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import CheckIcon from "@material-ui/icons/CheckCircleOutline";
import CrossIcon from "@material-ui/icons/CancelOutlined";

const REGISTERATION_URL =
  "https://hosting.digifyworks.com/merd/subscription-confirmation/";

const SubcriptionPlansTable = ({ subscriptionsCount, cities, categories }) => {
  const [sixMonthsTotal, setSixMonthsTotal] = useState(0);
  const [twelveMonthsTotal, setTwelveMonthsTotal] = useState(0);

  function createForm(amount) {
    let form = document.createElement("form");
    form.style.visibility = "hidden"; // no user interaction is necessary
    form.method = "POST"; // forms by default use GET query strings
    form.action = REGISTERATION_URL;

    const cityInput = document.createElement("input");
    cityInput.name = "cities";
    cityInput.value = cities.toString();
    form.appendChild(cityInput);

    const categoryInput = document.createElement("input");
    categoryInput.name = "categories";
    categoryInput.value = categories.toString();
    form.appendChild(categoryInput);

    const amountInput = document.createElement("input");
    amountInput.name = "amount";
    amountInput.value = amount.toString();
    form.appendChild(amountInput);

    document.body.appendChild(form); // forms cannot be submitted outside of body
    form.submit();

    console.log(cities.toString());
  }

  function handle6MonthSubscription() {
    createForm(sixMonthsTotal);
  }

  function handle12MonthSubscription() {
    createForm(twelveMonthsTotal);
  }

  useEffect(() => {
    let total6 = 6500;
    let total12 = 9500;

    for (let i = 0; i < subscriptionsCount - 1; i++) {
      total6 = 2 * total6 - total6 * 0.2; //price of every subsequent subscription get reduced by 20%
      total12 = 2 * total12 - total12 * 0.2;
    }

    setSixMonthsTotal(total6);
    setTwelveMonthsTotal(total12);
  }, [subscriptionsCount]);
  return (
    <TableContainer
      component={Paper}
      className="sub-plan-table"
      style={{ width: "auto", overflowX: "hidden" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: "#BCD9EA" }} align="center">
              Plan
            </TableCell>
            <TableCell
              style={{ backgroundColor: "#026AA7", color: "white" }}
              align="center"
            >
              6-Months
            </TableCell>
            <TableCell
              style={{ backgroundColor: "#055A8C", color: "white" }}
              align="center"
            >
              12-Months
            </TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: "#BCD9EA" }} align="center">
              On Offer
            </TableCell>
            <TableCell
              style={{ backgroundColor: "#026AA7", color: "white" }}
              align="center"
            >
              AED {sixMonthsTotal}
              <br />
              {"(All Inclusive)"}
            </TableCell>
            <TableCell
              style={{ backgroundColor: "#055A8C", color: "white" }}
              align="center"
            >
              AED {twelveMonthsTotal}
              <br />
              {"(All Inclusive)"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="left"
            >
              Monthly Retail Market Size (i.e., Sales Data) For Subscribed
              Cities / Categories
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" style={{ textTransform: "capitalize" }}>
              demogarphic data For Subscribed Cities / Categories
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="left"
            >
              Tourist data for Subscribed cities.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" style={{ textTransform: "capitalize" }}>
              Access to catchments analysis for subscribes cities.
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="left"
            >
              Access to Tourist data - all other cities.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              <CheckIcon style={{ color: "green" }} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" style={{ textTransform: "capitalize" }}>
              Access to city reports - all cities.
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              <CrossIcon style={{ color: "red" }} />
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              Any two per subscriptions per term (12 Months).
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="left"
            >
              Access to catchments analysis - all other cities covered.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              1 request allowed; any city
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              3 requests allowed per subscription per term(12 months); any city.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" style={{ textTransform: "capitalize" }}>
              Ad-HOC data requests for other cities / categories (To be sent via
              enail; not DIY).
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              Total 3 requests; restricted to 5 data points in each request.
            </TableCell>
            <TableCell align="center" style={{ textTransform: "capitalize" }}>
              Total 9 requests; restricted to 5 data points in each request.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="left"
            >
              Limits on Clicks.
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              4,000
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#E5E5E5",
                textTransform: "capitalize",
              }}
              align="center"
            >
              no limits
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell
              style={{
                backgroundColor: "blue",
                textTransform: "capitalize",
                color: "white",
                border: "1px solid white",
                cursor: "pointer",
              }}
              align="center"
              onClick={handle6MonthSubscription}
            >
              Subscribe Now
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "blue",
                textTransform: "capitalize",
                color: "white",
                border: "1px solid white",
                cursor: "pointer",
              }}
              align="center"
              onClick={handle12MonthSubscription}
            >
              Subscribe Now
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubcriptionPlansTable;

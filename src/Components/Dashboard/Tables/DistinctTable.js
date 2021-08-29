import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { v4 as uuidv4 } from "uuid";

const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

let monthTotals = [];

class DistinctTable extends Component {
  calculateMonthTotals = (data, months) => {
    monthTotals = [];

    months.forEach((month) => {
      let monthTotal = 0;

      data.forEach((row) => {
        row.month.forEach((months) => {
          if (months.month === month) {
            monthTotal = monthTotal + months.market_size;
          }
        });
      });
      monthTotals.push(monthTotal);
    });
  };

  findMonths = (data) => {
    const months = [];
    data.forEach((obj) => {
      obj.month.forEach((month) => {
        if (!months.includes(month.month)) months.push(month.month);
      });
    });
    return months;
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toUSDString(num) {
    // takes a number, returns a string ofnumber with commas as thousands separators
    return `$${this.numberWithCommas(num)}`;
  }

  render() {
    if (this.props.data.length > 0) {
      let empty = true;
      this.props.data.forEach((obj) => {
        if (obj.total_market_size > 0) empty = false;
      });
      if (!empty) {
        const { data } = this.props;
        data.sort((a, b) => (parseInt(a.zone) > parseInt(b.zone) ? 1 : -1));
        data.forEach((data) => {
          data.month.sort((a, b) => (a.month > b.month ? 1 : -1));
        });

        const months = this.findMonths(data);
        this.calculateMonthTotals(data, months);

        return (
          <TableContainer component={Paper} style={{ padding: "0.5rem" }}>
            <h3>{this.props.city}</h3>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Zone</TableCell>
                  {months.map((month) => (
                    <TableCell key={uuidv4()} align="right">
                      {monthNames[month]}
                    </TableCell>
                  ))}
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow
                    key={uuidv4()}
                    style={{ backgroundColor: idx % 2 ? "lightgrey" : "white" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.zone}
                    </TableCell>
                    {row.month.length > 0
                      ? months.map((month, index) =>
                          row.month[index] &&
                          month === row.month[index].month ? (
                            <TableCell align="right" key={uuidv4()}>
                              {this.toUSDString(row.month[index].market_size)}
                            </TableCell>
                          ) : (
                            <TableCell align="right" key={uuidv4()}>
                              {"$0"}
                            </TableCell>
                          )
                        )
                      : months.map((_) => (
                          <TableCell align="right" key={uuidv4()}>
                            {"$0"}
                          </TableCell>
                        ))}
                    <TableCell align="right">
                      {this.toUSDString(row.total_market_size)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow style={{ backgroundColor: "lightblue" }}>
                  <TableCell>Total</TableCell>
                  {monthTotals.map((monthTotal) => (
                    <TableCell key={uuidv4()} align="right">
                      {this.toUSDString(monthTotal)}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    {this.toUSDString(this.props.totalMarketSize)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      } else
        return (
          <h4
            style={{ color: "green" }}
          >{`Data not available yet for ${this.props.city} for the year ${this.props.year}`}</h4>
        );
    } else
      return (
        <h4
          style={{ color: "green" }}
        >{`Data not available yet for ${this.props.city} for the year ${this.props.year}`}</h4>
      );
  }
}

export default DistinctTable;

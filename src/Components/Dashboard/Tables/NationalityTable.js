import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { v4 as uuidv4 } from "uuid";

function roundToNearestThousand(num) {
  if (typeof num !== "number") return;
  return 1000 * Math.round(num * 0.001);
}

class DistinctTable extends Component {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toUSDString(num) {
    // takes a number, returns a string ofnumber with commas as thousands separators
    num = roundToNearestThousand(num);
    return `$${this.numberWithCommas(num)}`;
  }
  calcTotal(data) {
    let total = 0;
    data.forEach(
      (row) => (total += roundToNearestThousand(row.total_market_size))
    );
    return total;
  }

  render() {
    console.log(this.props.data);
    if (this.props.data.length > 0) {
      let empty = false;
      // this.props.data.forEach(obj => {
      //     if (obj.total_market_size > 0) empty = false;
      // })
      if (!empty) {
        const { data, year, city } = this.props;

        data.sort((a, b) => (parseInt(a.zone) > parseInt(b.zone) ? 1 : -1));

        return (
          <TableContainer
            component={Paper}
            style={{ width: "50%", margin: "0 auto" }}
          >
            <h3>{`Market Size data of ${city} for the year ${year}`}</h3>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Zones</TableCell>
                  <TableCell align="right">Market Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow
                    key={uuidv4()}
                    style={{ backgroundColor: idx % 2 ? "white" : "lightgrey" }}
                  >
                    <TableCell component="th" scope="row">
                      {`Zone ${row.zone}`}
                    </TableCell>
                    <TableCell align="right">
                      {row.total_market_size === 0
                        ? "Not Available"
                        : this.toUSDString(row.total_market_size)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                    Total
                  </TableCell>
                  <TableCell align="right">
                    {`$${this.numberWithCommas(this.calcTotal(data))}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      } else return <h4 style={{ color: "red" }}>Data Not Available Yet</h4>;
    } else
      return (
        <h4
          style={{ color: "green" }}
        >{`Data not avaible yet for ${this.props.city} for the year ${this.props.year}`}</h4>
      );
  }
}

export default DistinctTable;

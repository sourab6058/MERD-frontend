import React, { Component } from "react";
import * as _ from "lodash";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { v4 as uuidv4 } from "uuid";

class ZoneTable extends Component {
  render() {
    console.log(this.props.data.length);
    if (this.props.data.length > 0) {
      let empty = false;
      // this.props.data.forEach(obj => {
      //     if (obj.total_market_size > 0) empty = false;
      // })
      if (!empty) {
        const { data, propertyName, year, city } = this.props;

        return (
          <TableContainer
            component={Paper}
            style={{ width: "50%", margin: "0 auto" }}
          >
            <h3>{`Market Size data of ${city} for the year ${year}`}</h3>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="right">Market Size</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, idx) => (
                  <TableRow
                    key={uuidv4()}
                    style={{ backgroundColor: idx % 2 ? "lightgrey" : "white" }}
                  >
                    <TableCell component="th" scope="row">
                      {_.capitalize(row[propertyName])}
                    </TableCell>
                    <TableCell align="right">
                      {row.total_market_size === 0
                        ? "Not Available"
                        : row.total_market_size}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      } else return <h4 style={{ color: "red" }}>Data Not Available yet</h4>;
    } else return <h3 style={{ color: "green" }}>Loading...</h3>;
  }
}

export default ZoneTable;

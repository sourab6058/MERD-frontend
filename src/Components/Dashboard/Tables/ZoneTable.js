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

function roundToNearestThousand(num) {
  if (typeof num !== "number") return;
  return 1000 * Math.round(num * 0.001);
}

class ZoneTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    console.log(this.props);
  };
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
  getZones(city, citiesAndZones) {
    const zones = citiesAndZones.forEach((cityAndZone) => {
      if (cityAndZone.includes(city)) {
        return cityAndZone;
      }
    });

    return zones;
  }
  getCategories = (propertyName, data) => {
    return data.map((row) => row[propertyName]).join();
  };
  render() {
    console.log(this.props.data.length);
    if (this.props.data.length > 0) {
      let empty = false;
      // this.props.data.forEach(obj => {
      //     if (obj.total_market_size > 0) empty = false;
      // })
      if (!empty) {
        const {
          data,
          propertyName,
          year,
          city,
          zones,
          months,
          nationalities,
          purchaseMode,
          placeOfPuchase,
        } = this.props;

        return (
          <TableContainer
            component={Paper}
            style={{ width: "50%", margin: "0 auto", padding: "0.25rem" }}
          >
            <span>
              {city}/{this.getZones(city, zones)}/
              {this.getCategories(propertyName, data)}/{year}/{months}/
              {nationalities}/{purchaseMode}/{placeOfPuchase}
            </span>
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
                        : this.toUSDString(row.total_market_size)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={uuidv4()}>
                  <TableCell component="th" scope="row">
                    {_.capitalize("Total")}
                  </TableCell>
                  <TableCell align="right">{`$${this.numberWithCommas(
                    this.calcTotal(data)
                  )}`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      } else return <h4 style={{ color: "red" }}>Data Not Available yet</h4>;
    } else return <h3 style={{ color: "green" }}>Loading...</h3>;
  }
}

export default ZoneTable;

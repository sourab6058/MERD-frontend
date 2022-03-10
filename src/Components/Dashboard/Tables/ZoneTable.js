import React, { Component } from "react";
import * as _ from "lodash";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "../../../css/tables.css";
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from "uuid";
import Download from "@material-ui/icons/CloudDownload";

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
    console.log(this.props.zones);
  };
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toUSDString(num) {
    // takes a number, returns a string ofnumber with commas as thousands separators
    num = roundToNearestThousand(num);
    return `${this.numberWithCommas(num)}`;
  }
  calcTotal(data) {
    let total = 0;
    data.forEach(
      (row) => (total += roundToNearestThousand(row.total_market_size))
    );
    return total;
  }
  getZones(city, citiesAndZones) {
    console.log(citiesAndZones);
    const zones = citiesAndZones.find((cityAndZone) => {
      if (cityAndZone.includes(city)) {
        return cityAndZone;
      }
    });

    return zones;
  }
  getCategories = (propertyName, data) => {
    return data.map((row) => row[propertyName]).join();
  };
  printDocument(city, year) {
    const input = document.getElementById('Zonetable');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 70;
        var pageHeight = 590;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4')
        var position = 28
        var heightLeft = imgHeight;
        pdf.setFont("arial", "bold");
        pdf.setFontSize(10);
        pdf.setTextColor(20, 67, 128);
        pdf.text(80, 5, `Source: Middle East Retail Data (MERD)`);
        pdf.setFont("arial", "bold");
        pdf.setFontSize(20);
        pdf.text(5, 24, `Market size data for ${city} ${year}`);

        pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);
        pdf.save(`Market_Size_Data_${city}_${year}.pdf`);

      });
  }
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
          placeOfPurchase,
          category
        } = this.props;

        return (
          <>
          <div style={{display:'flex',justifyContent: "flex-end",marginTop: '2rem', marginBottom: '2rem' }}>

          <Button onClick={() => this.printDocument(this.props.city, this.props.year)} endIcon={<Download />} variant="contained" color="primary">
            Generate Pdf
          </Button>
        </div>
        <h1 className="text-xl mt-3 mb-4 italic text-sky-600 capitalize">
        Market Size (In USD) For  {city} / Zones:{zones} / {year} / {months} / {category}
              {nationalities} / {purchaseMode} / {placeOfPurchase}
            </h1>
          <TableContainer
            component={Paper}
            style={{ width: "50%", margin: "0 auto", padding: "0.25rem" }}
          >
            {/* <span className="table-header">
              {city}/Zones:{this.getZones(city, zones)}/
              {this.getCategories(propertyName, data)}/{year}/{months}/
              {nationalities}/{purchaseMode}/{placeOfPuchase}
            </span> */}
            <Table id="Zonetable" aria-label="simple table" size="small">
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
          </>
        );
      } else return <h4 style={{ color: "red" }}>Data Not Available yet</h4>;
    } else return <h3 style={{ color: "green" }}>Loading...</h3>;
  }
}

export default ZoneTable;

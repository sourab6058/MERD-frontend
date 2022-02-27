import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from "uuid";
import Download from "@material-ui/icons/CloudDownload";

import "../../../css/tables.css";

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

  getZonesList = () => {
    return this.props.data.length == 23 ? "All Zones": this.props.data.map((row) => row.zone).join();
  };
  printDocument(city,year) {
    const input = document.getElementById('nationaltable');
    html2canvas(input)
      .then((canvas) => {
        var imgWidth = 70;
        var pageHeight = 590;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4')
        var position = 12;
        var heightLeft = imgHeight;
        pdf.text(10, 10, `Market size data for ${city} ${year}`);
        pdf.text(5, 5, `Source: Middle East Retail Data (MERD)`);

        pdf.addImage(imgData, 'JPEG', 12, position, imgWidth, imgHeight);
        pdf.save(`Market_Size_Data_${city}_${year}.pdf`);

      });
  }
  render() {
    console.log(this.props);
    if (this.props.data.length > 0) {
      let empty = false;
      // this.props.data.forEach(obj => {
      //     if (obj.total_market_size > 0) empty = false;
      // })
      if (!empty) {
        const {
          data,
          city,
          category,
          placeOfPurchase,
          purchaseMode,
          year,
          months,
          nationalities,
        } = this.props;

        data.sort((a, b) => (parseInt(a.zone) > parseInt(b.zone) ? 1 : -1));

        return (
         <>
           <h1 className="text-xl mt-3 mb-4 italic text-sky-600 capitalize">
            Market Size For  {city} / Zones:{this.getZonesList()} / {year} / {months} / {category}
              / {nationalities} / {purchaseMode} / {placeOfPurchase}
            </h1>
          <TableContainer
            component={Paper}
            style={{ width: "50%", margin: "2rem auto" }}
           
          >
            {/* <span className="table-header">
              {city}/Zones:{this.getZonesList()}/{category}/{year}/{months}/
              {nationalities}/{purchaseMode}/{placeOfPurchase}
            </span> */}
            {/* <h1  >This is Market Size Data</h1> */}
            <Table id="nationaltable" aria-label="simple table" size="small">
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
         <div style={{marginTop:'2rem',marginBottom:'2rem'}}>
           
         <Button onClick={()=> this.printDocument(this.props.city,this.props.year)} endIcon={<Download/>}  variant="contained" color="primary">  
            Generate Pdf  
            </Button>  
            </div>
          </TableContainer>
         </>
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

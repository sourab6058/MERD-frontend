import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from "uuid";
import Download from "@material-ui/icons/CloudDownload";


// excel
import * as XLSX from 'xlsx/xlsx.mjs';

/* load 'fs' for readFile and writeFile support */

// excel 
import "../../../css/tables.css";

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

function roundToNearestThousand(num) {
  if (typeof num !== "number") return;
  return 1000 * Math.round(num * 0.001);
}

class DistinctTable extends Component {
  constructor(props) {
    super(props);
  }
  calculateMonthTotals = (data, months) => {
    monthTotals = [];

    months.forEach((month) => {
      let monthTotal = 0;

      data.forEach((row) => {
        row.month.forEach((months) => {
          if (months.month === month) {
            monthTotal =
              monthTotal + roundToNearestThousand(months.market_size);
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
    num = roundToNearestThousand(num);
    if (num == 0) {
      return "NA"
    } else {
      return `$${this.numberWithCommas(num)}`;
    }

  }

  getZones(city, citiesAndZones) {
    console.log(citiesAndZones);
    const zones = citiesAndZones.find((cityAndZone) => {
      if (cityAndZone.includes(city)) {
        return cityAndZone.split("<")[1];
      }
    });
  }
  getMonthNameList(months) {
    return months.length === 12
      ? "All Months"
      : months.map((month) => monthNames[month]).join();
  }
  // pdf download
  printDocument(city, year, nationality, allNationality, allNationalityNames) {
    // console.log(city,"cityPDF")
    console.log(allNationality, "allNationality")
    if (allNationality == true) {
      const canvases = [...document.querySelectorAll('.alltables')]

      const doc = new jsPDF('l', 'mm', 'a4');
      canvases.forEach((a, i) => {
        html2canvas(a)
          .then(canvas => {
            var imgWidth = 270;
            var pageHeight = 490;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            const imgData = canvas.toDataURL('image/png');
            var position = 12;
            var heightLeft = imgHeight;
            doc.addImage(imgData, 'JPEG', 12, position, imgWidth, imgHeight);
            doc.text(2, 5, `source:MERD`);
            if (canvases.length > (i + 1)) {
              doc.addPage()
            }
          })
          .then(() => {
            if ((i + 1) === canvases.length) {
              doc.save('Market_size_for_all_Nationalities.pdf')
            }
          })
      })





    } else {                                                 //if all nationality not selected 
      const input = document.getElementById(nationality);
      html2canvas(input)
        .then((canvas) => {
          var imgWidth = 270;
          var pageHeight = 490;
          var imgHeight = canvas.height * imgWidth / canvas.width;
          var heightLeft = imgHeight;
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('l', 'mm', 'a4')
          var position = 12;
          var heightLeft = imgHeight;
          // pdf.text("Market Size Data",40, 250, 'center')
          pdf.addImage(imgData, 'JPEG', 12, position, imgWidth, imgHeight);
          pdf.text(2, 5, `source:MERD`);

          // imgData,format,x,y,
          pdf.save(`Market_Size_Data_${city}_${year}.pdf`);

        });
    }
  }
  exportExcel(fileExtension, fileName, nationality, allNationality,allNationalityNames) {
      console.log(allNationality ,"checking..")
    if (allNationality == true) {
      const canvasesExcel = [...document.querySelectorAll('.alltables')]
      const NationalitySelected = []
      allNationalityNames.map((d,i)=>{
        return NationalitySelected.push(d.nationality)
      })
      console.log(NationalitySelected,"NationalitySelected")
      var workbook = XLSX.utils.book_new();                    
      
      canvasesExcel.forEach((a, i) => {
        var wb2 = XLSX.utils.table_to_sheet(a)
        XLSX.utils.book_append_sheet(workbook, wb2,`${NationalitySelected[i]}` );
       })
       XLSX.writeFile(workbook,'multisheet_file.xlsx');

    } else {
      const htmlTable = document.getElementById(nationality)
      var wb = XLSX.utils.table_to_book(htmlTable, { sheet: "sheet1" })
      return XLSX.writeFile(wb, fileName + "." + fileExtension || ('mySheetName.' + (fileExtension || 'xlsx')));
    }
  }
  render() {
    const purchaseMode = this.props.purchaseMode;
    console.log(this.props.data, "for excel***")
    if (this.props.data.length > 0) {
      let empty = true;
      this.props.data.forEach((obj) => {
        if (obj.total_market_size > 0) empty = false;
      });
      if (!empty) {
        const {
          data,
          city,
          zones,
          category,
          year,
          monthsSelected,
          nationality,
          purchaseMode,
          placeOfPurchase,
          allNationality,
          allNationalityNames
        } = this.props;
        data.sort((a, b) => (parseInt(a.zone) > parseInt(b.zone) ? 1 : -1));
        data.forEach((data) => {
          data.month.sort((a, b) => (a.month > b.month ? 1 : -1));
        });

        const months = this.findMonths(data);
        this.calculateMonthTotals(data, months);

        return (
          <div className="container-tabless">
            <div className="btnForExport" >
              <Button
                onClick={() =>
                  this.printDocument(this.props.city, this.props.year, this.props.nationality, this.props.allNationality, this.props.allNationalityNames)}
                variant="contained"
                endIcon={<Download />}
                color="primary">
                Generate PDF
              </Button>


              <Button
                variant="contained"
                id="tablexl"
                onClick={() => this.exportExcel('xlsx', this.props.year, this.props.nationality, this.props.allNationality,this.props.allNationalityNames)} endIcon={<Download />} color="primary">
                Export Excel
              </Button>

            </div>
            <TableContainer component={Paper} style={{ padding: "0.5rem" }}>

              <Table id={nationality} className="alltables" aria-label="simple table" size="small" >

                <TableHead>


                  <TableRow>
                    <TableCell align="left" colSpan={14}>
                      Market Size For  {city} / Zones:{this.getZones(city, zones)} / {year} / {monthsSelected} / {category}
                      / {nationality} / {purchaseMode} / {placeOfPurchase}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Zone</TableCell>
                    {months.map((month) => (
                      <TableCell key={uuidv4()} align="right">
                        {monthNames[month]}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      Total <br />
                      {/* {purchaseMode} */}
                    </TableCell>
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
                              {"month"}
                            </TableCell>
                          )
                        )
                        : months.map((_) => (
                          <TableCell align="right" key={uuidv4()}>
                            {"NA"}
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
          </div>
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

import React, { useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";

const Second = ({ handleNext, handlePrev }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <>
      <div className="sub-container second">
        <span onClick={handlePrev} className="btn">
          Back
        </span>
        <div className="top-text">
          <h1>Plans</h1>
        </div>
        <TableContainer component={Paper} style={{ maxWidth: "80vw" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Demographic Data
                </TableCell>
                <TableCell>All Products</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  Population Distribution By Neighbourhood and Nationality
                </TableCell>
                <TableCell rowSpan={3}>All Demographic Data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Income Distribution By Neighbourhood and Nationality
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Age Distribution By Neighbourhood</TableCell>
              </TableRow>
              <TableRow>
                <TableCell rowSpan={4}></TableCell>
                <TableCell>
                  Monthly Market Size Data By Neighbourhood and Nationality For
                  Chosen Category and Sub Categories
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Catchments Analysis Maps and Market Size For Key Malls In
                  Chosen City
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>City Report For Chosen City</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tourist Data For Chosen City</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>UPDATED ANNUALLY</TableCell>
                <TableCell>MARKET SIZE DATA UPDATED MONTHLY</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">USD 1,000 PER ANNUM</TableCell>
                <TableCell align="center">USD 3,000 PER ANNUM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <span
                    className="sub-btn equal-btns"
                    onClick={() => handleNext("demographic")}
                  >
                    Subscribe To Demographic
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span
                    className="sub-btn equal-btns"
                    onClick={() => handleNext("all-products")}
                  >
                    Subscribe To All Products
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Second;

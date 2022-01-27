//Required to map to Nam of the months for monthNamesRow variable
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

const distinctcsv = (csvData, months) => {
  //tableData received from Dashboard
  let data = csvData;
  //Final return array
  let csv = [];

  //Used to generate other rows as number of cols is dynamic
  const numOfCols = months.length + 2;

  //Used for empty space for titles
  const emptySpaces = [];
  for (let i = 0; i < numOfCols - 1; i++) {
    emptySpaces.push("");
  }

  //Used for gap between tables
  const emptyRow = [];
  for (let i = 0; i < numOfCols; i++) {
    emptyRow.push("");
  }

  //Sort the months array
  months.sort();

  //Assinging Month names from months array
  const monthNamesRow = [];
  months.forEach((month) => {
    monthNamesRow.push(monthNames[month]);
  });

  data.forEach((obj) => {
    obj.forEach((year) => {
      year.cities.forEach((city) => {
        city.categories.forEach((category) => {
          //Pushing Category heading
          csv.push([category.category, ...emptySpaces]);

          //Checking if category has any subcategories, if not will go ahead looping through nationality
          if (category.hasOwnProperty("nationality")) {
            category.nationality.forEach((nationality) => {
              //Pushing Nationality heading
              csv.push([nationality.nationality, ...emptySpaces]);

              //Pushing table headers
              csv.push(["Zones", ...monthNamesRow, "Total"]);
              nationality.data.forEach((row) => {
                let market_sizes = [];
                months.forEach((month, index) => {
                  if (row.month.length > 0) {
                    //checking if month of index exists and if the month matches to the header months
                    if (row.month[index] && row.month[index].month === month) {
                      //Pushing into market_sizes
                      market_sizes.push(row.month[index].market_size);
                    } else {
                      //If month of index doesn't exist, pushing zero
                      market_sizes.push(0);
                    }
                  } else {
                    //pushing 0 to all months if month = []
                    market_sizes.push(0);
                  }
                });
                //Pushing the constructed row
                csv.push([row.zone, ...market_sizes, row.total_market_size]);
              });
              //calculating the Total row
              let monthTotals = calculateMonthTotals(nationality.data, months);
              //pushing the total row
              csv.push([
                "Total",
                ...monthTotals,
                nationality.total_zone_market_size,
              ]);
              //pushing the year and city information
              csv.push([`(${year.year} - ${city.city})`]);
              //empty gap between tables
              csv.push([...emptyRow]);
            });
          } else {
            //Category has subcategory, so looping through subcategory
            category.subcategories.forEach((subcategory) => {
              //Pushing subcategory header
              csv.push([subcategory.subcategory, ...emptySpaces]);

              //Checking if subcategory has any subsubcategories, if not will go ahead looping through nationality
              if (subcategory.hasOwnProperty("nationalities")) {
                subcategory.nationalities.forEach((nationality) => {
                  //Pushing Nationality header
                  csv.push([nationality.nationality, ...emptySpaces]);

                  //pushing table headers
                  csv.push(["Zones", ...monthNamesRow, "Total"]);
                  nationality.data.forEach((row) => {
                    let market_sizes = [];
                    months.forEach((month, index) => {
                      if (row.month.length > 0) {
                        if (
                          row.month[index] &&
                          row.month[index].month === month
                        ) {
                          market_sizes.push(row.month[index].market_size);
                          console.log("reached");
                        } else {
                          market_sizes.push(0);
                        }
                      } else {
                        market_sizes.push(0);
                      }
                    });
                    //Pushing the constructed row
                    csv.push([
                      row.zone,
                      ...market_sizes,
                      row.total_market_size,
                    ]);
                  });
                  //Calculating total row
                  let monthTotals = calculateMonthTotals(
                    nationality.data,
                    months
                  );
                  //Pushing total row
                  csv.push([
                    "Total",
                    ...monthTotals,
                    nationality.total_zone_market_size,
                  ]);
                  //Pushing year and city info
                  csv.push([`(${year.year} - ${city.city})`]);
                  //empty gap between tables
                  csv.push([...emptyRow]);
                });
              } else {
                subcategory.subsubcategories.forEach((subsubcategory) => {
                  //Pushing subsubcategory heading
                  csv.push([subsubcategory.subsubcategory, ...emptySpaces]);

                  subsubcategory.nationalities.forEach((nationality) => {
                    //Pushing nationality heading
                    csv.push([nationality.nationality, ...emptySpaces]);

                    //Pushing Table headers
                    csv.push(["Zones", ...monthNamesRow, "Total"]);
                    nationality.data.forEach((row) => {
                      let market_sizes = [];
                      months.forEach((month, index) => {
                        if (row.month.length > 0) {
                          if (
                            row.month[index] &&
                            row.month[index].month === month
                          ) {
                            market_sizes.push(row.month[index].market_size);
                            console.log("reached");
                          } else {
                            market_sizes.push(0);
                          }
                        } else {
                          market_sizes.push(0);
                        }
                      });
                      //Pushing the constructed row
                      csv.push([
                        row.zone,
                        ...market_sizes,
                        row.total_market_size,
                      ]);
                    });
                    //Calculating the totals
                    let monthTotals = calculateMonthTotals(
                      nationality.data,
                      months
                    );
                    //Pushing the total row
                    csv.push([
                      "Total",
                      ...monthTotals,
                      nationality.total_zone_market_size,
                    ]);
                    //pushing the year and city info
                    csv.push([`(${year.year} - ${city.city})`]);
                    //empty gap between tables
                    csv.push([...emptyRow]);
                  });
                });
              }
            });
          }
        });
      });
    });
  });

  console.table(csv);

  return csv;
};

const calculateMonthTotals = (data, months) => {
  let monthTotals = [];

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

  return monthTotals;
};

export default distinctcsv;

import getMonths from "./getMonths";
import getZones from "./getZones";

function getCategories(data, propertyName) {
  if (propertyName === "category")
    return data.map((category) => category.category).join();
  if (propertyName === "sub") {
    const subcategories = [];

    data.subcategories.forEach((subcat) => {
      subcategories.push(subcat.subcategory);
    });

    return subcategories.join();
  }
  if (propertyName === "subsub") {
    const subsubcategories = [];

    data.forEach((subsubcat) => {
      subsubcategories.push(subsubcat.subsubcategory);
    });

    return subsubcategories.join();
  }
}
function getPlaceOfPurchase(placeOfPurchase) {
  if (placeOfPurchase.length === 2) return "All Places";
  if (placeOfPurchase[0] === "in") return "In City";
  if (placeOfPurchase[0] === "out") return "Outside City";
}

function totalMarketSize(data) {
  let total = 0;

  data.forEach((category) => {
    total += category.total_market_size;
  });

  return total;
}

const zonescsv = (
  csvData,
  months,
  purchaseMode,
  placeOfPurchase,
  zones,
  nationalities
) => {
  console.log(months, purchaseMode, placeOfPurchase, zones, nationalities);

  const headers = ["Category", "Market Size"];
  const emptyRow = ["", ""];
  const resultArray = [];

  csvData.forEach((division) => {
    division.forEach((year) => {
      if (year.hasOwnProperty("data")) {
        year.data.forEach((city) => {
          resultArray.push([
            `${getZones(city.city, zones)}/${getCategories(
              city.market_data,
              "category"
            )}/${year.year}/${getMonths(
              months
            )}/${nationalities}/${purchaseMode}/${getPlaceOfPurchase(
              placeOfPurchase
            )}`,
          ]);
          // console.log(resultArray[0]);
          resultArray.push(headers);
          city.market_data.forEach((category) => {
            resultArray.push([category.category, category.total_market_size]);
          });
          resultArray.push(["Total", totalMarketSize(city.market_data)]);
          resultArray.push(emptyRow);
        });
      } else {
        console.log(year);
        year.cities.forEach((city) => {
          city.categories.forEach((category) => {
            // resultArray.push([category.category, ""]);
            resultArray.push([
              `
                ${getZones(city.city, zones)}/${getCategories(category)}/${
                year.year
              }/${getMonths(
                months
              )}/${nationalities}/${purchaseMode}/${getPlaceOfPurchase(
                placeOfPurchase
              )}
              `,
            ]);

            if (category.subcategories[0].hasOwnProperty("total_market_size")) {
              resultArray.push(headers);
              category.subcategories.forEach((subcategory) => {
                resultArray.push([
                  subcategory.subcategory,
                  subcategory.total_market_size,
                ]);
              });
              resultArray.push([
                "Total",
                `${totalMarketSize(category.subcategories)}`,
              ]);
              resultArray.push(emptyRow);
            } else {
              console.log(category.subcategories);
              category.subcategories.forEach((subcategory) => {
                // resultArray.push([subcategory.subcategory, ""]);
                resultArray.push([
                  `
                    ${getZones(city.city, zones)}/${getCategories(
                    subcategory.subsubcategories,
                    "subsub"
                  )}/${year.year}/${getMonths(
                    months
                  )}/${nationalities}/${purchaseMode}/${getPlaceOfPurchase(
                    placeOfPurchase
                  )}
                  `,
                ]);

                resultArray.push(headers);
                subcategory.subsubcategories.forEach((subsubcategory) => {
                  resultArray.push([
                    subsubcategory.subsubcategory,
                    subsubcategory.total_market_size,
                  ]);
                });
                resultArray.push([
                  "Total",
                  `${totalMarketSize(subcategory.subsubcategories)}`,
                ]);
                // resultArray.push([`(${year.year} - ${city.city})`, ""]);
                resultArray.push(emptyRow);
              });
            }
          });
        });
      }
    });
  });
  return resultArray;
};

export default zonescsv;

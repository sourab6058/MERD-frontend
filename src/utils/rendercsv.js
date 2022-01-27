import distinctcsv from "./distinctcsv";
import zonescsv from "./zonescsv";
import nationalitycsv from "./nationalitycsv";

const rendercsv = (
  csvData,
  months,
  displayMode,
  purchaseMode,
  placeOfPuchase,
  zones,
  nationalities
) => {
  switch (displayMode) {
    case "distinct":
      return distinctcsv(
        csvData,
        months,
        purchaseMode,
        placeOfPuchase,
        zones,
        nationalities
      );
    case "zones":
      return zonescsv(
        csvData,
        months,
        purchaseMode,
        placeOfPuchase,
        zones,
        nationalities
      );
    case "nationality":
      return nationalitycsv(
        csvData,
        months,
        purchaseMode,
        placeOfPuchase,
        zones,
        nationalities
      );

    default:
      console.log("default reached");
  }
};

export default rendercsv;

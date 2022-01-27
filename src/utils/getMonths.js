export default function getMonths(months) {
  if (months.length === 12) return "All Months";
  else {
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

    const monthsSelected = months.map((month) => monthNames[month]);
    return monthsSelected;
  }
}

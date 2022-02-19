import writeXlsxFile from "write-excel-file";

function repeatCell(span, obj) {
  const repeatedObj = [];

  for (let i = 0; i < span; i++) repeatedObj.push({ ...obj, span });

  return repeatedObj;
}

async function renderExcel(csvData) {
  console.table(csvData,"cdcdcd");
  // return;

  const data = [
    repeatCell(6, {
      value: "Middle East Retail Data",
      align: "center",
      fontWeight: "bold",
      backgroundColor: "#144380",
      color: "#ffffff",
    }),
  ];

  csvData.forEach((row) => {
    if (row.length === 1) {
      //for title
      data.push([
        ...repeatCell(6, {
          value: row[0],
          align: "center",
          fontWeight: "bold",
          height: 50,
          backgroundColor: "#baffb8",
          wrap: true,
        }),
      ]);
    } else if (row[0] === "Total") {
      data.push([
        ...repeatCell(3, {
          value: row[0],
          align: "left",
          fontWeight: "bold",
          backgroundColor: "#b8eaff",
        }),
        ...repeatCell(3, {
          value: row[1],
          align: "right",
          backgroundColor: "#b8eaff",
        }),
      ]);
    } else if (row.includes("Market Size")) {
      data.push([
        ...repeatCell(3, {
          value: row[0],
          align: "left",
          fontWeight: "bold",
        }),
        ...repeatCell(3, {
          value: row[1],
          align: "right",
          fontWeight: "bold",
        }),
      ]);
    } else {
      data.push([
        ...repeatCell(3, {
          value: row[0],
          align: "left",
        }),
        ...repeatCell(3, {
          value: row[1],
          align: "right",
          type: Number,
        }),
      ]);
    }
  });

  // When passing `data` for each cell.
  await writeXlsxFile(data, {
    fileName: "MERD.xlsx",
  });
}

export default renderExcel;

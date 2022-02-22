import React from "react";
import { Button, Card } from "antd";
import axios from "axios";

const API_URL = "http://data.merd.online:8000/demographic/";

export default function TableCard({ data }) {
  const { city, year, nationality, type, mode, table_id } = data;

  function downloadBlob(blob, name) {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    console.log(blobUrl);
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  }

  function handleDownload(table_id, filename) {
    axios
      .get(`${API_URL}?id=${table_id}`, {
        responseType: "blob",
      })
      .then((res) => {
        // const blob = new Blob([res.data], { type: "application/pdf" });
        // this.downloadBlob(blob, "test.pdf");
        console.log(res);
        downloadBlob(res.data, filename);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="table-card">
      <Card
        size="small"
        title={"Excel file"}
        style={{ margin: "1rem", minWidth: "300px", minHeight: "250px" }}
        extra={
          table_id ? (
            <Button
              style={{ margin: "0" }}
              onClick={() => handleDownload(table_id, "MERD-Excel")}
            >
              Download
            </Button>
          ) : (
            "Not available!"
          )
        }
      >
        <h4>City:{city}</h4>
        <h4>Year:{year}</h4>
        <h4>Nationality:{nationality}</h4>
        <h4>Mode:{mode}</h4>
        <h4>Type:{type}</h4>
      </Card>
    </div>
  );
}

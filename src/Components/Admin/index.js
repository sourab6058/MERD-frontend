import React from "react";
import ReportUpload from "./ReportUpload";
import FileUpload from "./FileUpload";

export default function index() {
  return (
    <div>
      <FileUpload api={"upload_data/"} title={"Upload Data"} />
      <FileUpload api={"upload_census_data/"} title={"Upload Census Data"} />
      <ReportUpload title="City Reports" url="city_reports/" />
      <ReportUpload title="Tourist Reports" url="tourist_reports/" />
    </div>
  );
}

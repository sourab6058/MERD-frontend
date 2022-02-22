import React from "react";
import { Checkbox, Space } from "antd";
import { Paper } from "@material-ui/core";

export default function DisplayModePage({
  handleDisplayModeCheck,
  natChecked,
}) {
  return (
    <div>
      <div className="page-title">How do you want to view the data?</div>
      <Paper>
        <div className="checkboxes-container">
          <Checkbox.Group onChange={handleDisplayModeCheck}>
            <Space direction="vertical">
              <Checkbox value="zone">By Zone</Checkbox>
              {!natChecked && <Checkbox value="nat">By Nationality</Checkbox>}
              <Checkbox value="zone-and-nat">By Zone and nationality</Checkbox>
            </Space>
          </Checkbox.Group>
        </div>
      </Paper>
    </div>
  );
}

import React, { Component } from "react";
import { Checkbox, Space } from "antd";
import { Paper } from "@material-ui/core";

export default class DisplayModePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const askZone = true;
    const askNat = true;
    const askBoth = !this.props.types.every((type) =>
      ["income_checked", "age_checked", "labourers_checked"].includes(type)
    );
    return (
      <div>
        <div className="page-title">How do you want to view the data?</div>
        <Paper>
          <div className="checkboxes-container">
            <Checkbox.Group onChange={this.props.handleDisplayModeCheck}>
              <Space direction="vertical">
                {askZone && <Checkbox value="zone">By Zone</Checkbox>}
                {askNat && <Checkbox value="nat">By Nationality</Checkbox>}
                {askBoth && (
                  <Checkbox value="zone-and-nat">
                    By Zone and nationality
                  </Checkbox>
                )}
              </Space>
            </Checkbox.Group>
          </div>
        </Paper>
      </div>
    );
  }
}

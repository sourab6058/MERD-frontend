import React, { Component } from "react";
import { Checkbox, Space } from "antd";
import { Paper } from "@material-ui/core";

export default class DisplayModePage extends Component {
  constructor(props) {
    super(props);
  }

  handleModeCheck = (e) => {
    const modes = this.props.modes;

    if (e.target.checked) {
      modes.push(e.target.value);
    } else {
      const idx = modes.findIndex((m) => m === e.target.value);
      if (idx !== -1) modes.splice(idx, 1);
    }

    console.log(modes);

    this.props.handleDisplayModeCheck(modes);
  };

  render() {
    const askZone = true;
    const askNat = true;
    const askBoth = !this.props.types.every((type) =>
      ["age_checked", "labourers_checked"].includes(type)
    );
    return (
      <div className="page">
        <div className="page-title">How do you want to view the data?</div>
        <Paper>
          <div className="checkboxes-container rounded-lg shadow-lg p-4">
            <Space direction="vertical">
              {this.props.modes.includes("zone") ? (
                <Checkbox
                  value="zone"
                  checked={true}
                  onClick={(e) => this.handleModeCheck(e)}
                >
                  By Zone
                </Checkbox>
              ) : (
                <Checkbox
                  value="zone"
                  checked={false}
                  onClick={(e) => this.handleModeCheck(e)}
                >
                  By Zone
                </Checkbox>
              )}
              {this.props.modes.includes("nat") ? (
                <Checkbox
                  value="nat"
                  checked={true}
                  onClick={(e) => this.handleModeCheck(e)}
                >
                  By Nationality
                </Checkbox>
              ) : (
                <Checkbox
                  value="nat"
                  checked={false}
                  onClick={(e) => this.handleModeCheck(e)}
                >
                  By Nationality
                </Checkbox>
              )}
              {this.props.modes.includes("zone-and-nat") ? (
                <Checkbox
                  value="zone-and-nat"
                  checked={true}
                  onClick={(e) => this.handleModeCheck(e)}
                >
                  By Nationality By Zone
                </Checkbox>
              ) : (
                <Checkbox
                  value="zone-and-nat"
                  checked={false}
                  onClick={(e) => this.handleModeCheck(e)}
                >
                  By Nationality By Zones
                </Checkbox>
              )}
            </Space>
          </div>
        </Paper>
      </div>
    );
  }
}

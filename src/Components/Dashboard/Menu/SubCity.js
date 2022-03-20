import React, { Component } from "react";
import { Menu, Checkbox } from "antd";

const { SubMenu } = Menu;
let optionData = require("../optionData.json");
export class SubCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAll: false,
    };
  }

  //First checks all zones and then adds city using selectallzones
  checkedAll = (whereToBePushed, itemToBePushed, e) => {
    console.log(itemToBePushed, "itemToBePushed");
    this.setState({
      checkedAll: !this.state.checkedAll,
    });
    this.props.selectallzones(whereToBePushed, itemToBePushed, e);
  };

  render() {
    //Performing a shallow copy of this.props object
    const filteredProps = { ...this.props };
    //Removing custom functional props as antd causes trouble with them
    ["selectallzones", "addzone"].forEach((item) => delete filteredProps[item]);
    // console.log(this.props.city, '')

    const logData = () => {
      const countries = optionData[4][1];
      const uaes = countries.filter((ct) => ct.country.country === "UAE");
      // uaes.map((uae) => {
      //   console.log(uae.city);
      // });
      // console.log(countries);
      // console.log(countries[2]);
    };
    //Conditional rendering according to checkAll state
    return this.props.country.country === "UAE" ? (
      <SubMenu
        key={this.props.city.city}
        className="UAECityCountry hidden"
        title={this.props.country.country}
        {...filteredProps}
      >
        {optionData[4][1]
          .filter((ct) => ct.country.country === "UAE")
          .map((d, i) => {
            return (
              <SubMenu
                key={
                  this.props.city.id +
                  Math.floor(Math.random() * this.props.city.id)
                }
                title={d.city}
                {...filteredProps}
              >
                <Menu.Item>
                  <Checkbox
                    onChange={(e) => this.checkedAll("cities", d.id, e)}
                  >
                    Select All
                  </Checkbox>
                </Menu.Item>
                {d.zone.map((zone) =>
                  this.state.checkedAll ? (
                    <Menu.Item key={zone.id}>
                      <Checkbox
                        disabled={this.state.checkedAll}
                        checked={false}
                        onChange={(e) =>
                          this.props.addzone("zones", zone.id, e)
                        }
                      >{`Zone ${zone.zone}`}</Checkbox>
                    </Menu.Item>
                  ) : (
                    <Menu.Item key={zone.id}>
                      <Checkbox
                        disabled={this.state.checkedAll}
                        onChange={(e) =>
                          this.props.addzone("zones", zone.id, e)
                        }
                      >{`Zone ${zone.zone}`}</Checkbox>
                    </Menu.Item>
                  )
                )}
              </SubMenu>
            );
          })}
      </SubMenu>
    ) : (
      <SubMenu
        key={this.props.city.city}
        title={this.props.country.country}
        {...filteredProps}
      >
        <SubMenu
          key={this.props.city.city}
          title={this.props.city.city}
          {...filteredProps}
        >
          {/* {console.log(this.props.city.city,"his.props.city.city")} */}
          <Menu.Item>
            <Checkbox
              onChange={(e) => this.checkedAll("cities", this.props.city.id, e)}
            >
              Select All
            </Checkbox>
          </Menu.Item>
          {this.props.city.zone.map((zone) =>
            this.state.checkedAll ? (
              <Menu.Item key={zone.id}>
                <Checkbox
                  disabled={this.state.checkedAll}
                  checked={false}
                  onChange={(e) => this.props.addzone("zones", zone.id, e)}
                >{`Zone ${zone.zone}`}</Checkbox>
              </Menu.Item>
            ) : (
              <Menu.Item key={zone.id}>
                <Checkbox
                  disabled={this.state.checkedAll}
                  onChange={(e) => this.props.addzone("zones", zone.id, e)}
                >{`Zone ${zone.zone}`}</Checkbox>
              </Menu.Item>
            )
          )}
        </SubMenu>
      </SubMenu>
    );
  }
}

export default SubCity;

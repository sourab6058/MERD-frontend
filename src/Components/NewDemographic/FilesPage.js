import React, { Component } from "react";
import axios from "axios";
import TableCard from "./TableCard";

const API_URL = "http://data.merd.online:8000/demographic/";

export default class FilesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablesData: [],
    };
  }

  componentDidMount() {
    axios.post(API_URL, this.props.postObject).then((res) => {
      console.log(res.data);
      this.setState({ tablesData: res.data.data }, () =>
        console.log(this.state.tablesData)
      );
    });
  }

  render() {
    return (
      <>
        <h1 style={{ margin: "1rem" }}>Download Required Files Below</h1>
        <div className="cards-grid">
          {this.state.tablesData.length > 0 &&
            this.state.tablesData.map((td) => {
              const data = {};

              data.city = this.props.citiesOptions.find(
                (c) => c.id === td.city
              ).city;
              data.nationality = this.props.nationalitiesOptions.find(
                (n) => n.id === td.nationality
              ).nationality;

              data.year = td.year;

              switch (td.type) {
                case "income_checked":
                  data.type = "Income Levels";
                  break;
                case "nationality_checked":
                  data.type = "Nationality Distribution";
                  break;
                case "population_checked":
                  data.type = "Population";
                  break;
                case "age_checked":
                  data.type = "Age Distribution";
                  break;
                case "labourers_checked":
                  data.type = "Percentage Labourers";
                  break;
                case "capita_checked":
                  data.type = "Retail Spend Per Capita";
                  break;
                case "families_checked":
                  data.type = "Percentage without families but not labourers";
                  break;

                default:
                  data.type = "N/A";
                  break;
              }

              switch (td.mode) {
                case "zone":
                  data.mode = "By Zone";
                  break;
                case "nat":
                  data.mode = "By Nationality";
                  break;
                case "zone-and-nat":
                  data.mode = "By Zone and Nationality";
                  break;

                default:
                  data.mode = "N/A";
                  break;
              }

              data.table_id = td.table_id;

              console.log(td.table_id, td.message);

              return <TableCard data={data} />;
            })}
        </div>
      </>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import TableCard from "./TableCard";
import Card from "./Card";

const API_URL = "https://data.merd.online:8000/demographic/";

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
    console.log(this.props);
  }

  render() {
    return (
      <>
        <h1 style={{ margin: "1rem" }}>Download Required Files Below</h1>
        <div className="cards-grid mt-5">
          {this.state.tablesData.length > 0 &&
            this.state.tablesData.map((td) => {
              if (td.table_id === null) return <></>;
              const data = {};

              data.city = this.props.citiesOptions.find(
                (c) => c.id === td.city
              ).city;

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
              data.registeredUser = this.props.registeredUser;
              data.subscribedCity = this.props.citiesSubscribed.includes(
                data.city
              );

              data.showOneTimeSubPopUp = this.props.showOneTimeSubPopUp;

              console.log(td.table_id, td.message);

              return <Card data={data} />;
            })}
        </div>
      </>
    );
  }
}

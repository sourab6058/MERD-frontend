import React, { Component } from "react";
import Carousel from "react-material-ui-carousel";
import * as _ from "lodash";
import Typography from "@material-ui/core/Typography";

import DistinctTable from "./Tables/DistinctTable";
import ZoneTable from "./Tables/ZoneTable";
import NationalityTable from "./Tables/NationalityTable";
import FactsLoader from "./FactsLoader.js";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { v4 as uuidv4 } from "uuid";
import { YoutubeSearchedForSharp } from "@material-ui/icons";

// download



export class Tables extends Component {
  render() {
    console.log("SHOWDATA");
    console.log(this.props.zones, "zonesss");
    const data = this.props.data;
    console.table(data, "main-data**")
    const displayMode = this.props.displayMode;
    console.log(displayMode, "displayMode**")
    const purchaseMode =
      this.props.purchaseMode.length === 2
        ? "(Offline & Online)"
        : this.props.purchaseMode[0];
    const placeOfPurchase =
      this.props.placeOfPurchase.length === 2
        ? "In City and Outside City"
        : this.props.placeOfPurchase[0] === "in"
        ? "In City"
        : "Outside City";
    let year = -1;
    if (data && data.length > 0) {
      console.log("LOOOOOK");
      console.log(data);
      if (displayMode === "distinct") {
        return (
          <div key={uuidv4}>
            {console.log(data, "division string")}

            {data.map((division) => (
              
              <Carousel
                key={uuidv4()}
                autoPlay={false}
                indicators={false}
                swipe={false}
                style={{ textAlign: "center" }}
                timeout={100}
                navButtonsAlwaysVisible
                animation="slide"
                navButtonsProps={{
                  style: {
                    opacity: 0.9,
                  },
                }}
              >

                {division.map((year) => (
                  <div
                    key={uuidv4()}
                    className="pb-12"
                  // style={{
                  //   maxHeight: "90vh",
                  //   overflowY: "auto",
                  // }}
                  >
                    {" "}
                    {year.cities.map((city) => (
                      <div key={uuidv4()}>
                        {/* <h3>Market Size for {city.city} </h3> */}


                        {/* <Typography variant="h3">
                      {_.capitalize(year.year)}
                    </Typography> */}

                        {city.categories.map((category) => (
                          <div key={uuidv4()}>
                            {category.hasOwnProperty("subcategories") ? (
                              <div>
                                <Typography variant="h5">
                                  {_.capitalize(category.category)}
                                </Typography>
                                {category.subcategories.map((subcategory) => (
                                  <div
                                    style={{ margin: "20px 0" }}
                                    key={uuidv4()}
                                  >
                                    {subcategory.hasOwnProperty(
                                      "subsubcategories"
                                    ) ? (
                                      <div style={{ margin: "20px 0" }}>
                                        <Typography variant="h5">
                                          {subcategory.subcategory}
                                        </Typography>
                                        {subcategory.subsubcategories.map(
                                          (subsubcategory) => (
                                            <div
                                              style={{ margin: "20px 0" }}
                                              key={uuidv4()}
                                            >
                                              {/* <Typography variant="h5">  
                                                {subsubcategory.subsubcategory}
                                              </Typography> */}
                                              {subsubcategory.nationalities.map(
                                                (nationality) => (
                                                  <div
                                                    style={{
                                                      margin: "20px 0",
                                                    }}
                                                    key={uuidv4()}
                                                  >
                                                    {/* <Typography variant="h6">
                                                      {nationality.nationality}
                                                    </Typography> */}
                                                    <DistinctTable
                                                      data={nationality.data}

                                                      year={year.year}
                                                      city={city.city}
                                                      category={
                                                        subsubcategory.subsubcategory
                                                      }
                                                      totalMarketSize={
                                                        nationality.total_zone_market_size
                                                      }
                                                      nationality={
                                                        nationality.nationality
                                                      }
                                                      purchaseMode={
                                                        purchaseMode
                                                      }
                                                      placeOfPurchase={
                                                        placeOfPurchase
                                                      }
                                                      zones={this.props.zones}
                                                      monthsSelected={
                                                        this.props.months
                                                      }
                                                    />
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <div style={{ margin: "20px 0" }}>
                                        {/* <Typography variant="h5">
                                          {subcategory.subcategory}
                                        </Typography> */}
                                        hello
                                        {subcategory.nationalities.map(
                                          (nationality) => (
                                            <div
                                              style={{ margin: "20px 0" }}
                                              key={uuidv4()}
                                            >
                                              {/* <Typography variant="h6">
                                                {nationality.nationality}
                                              </Typography> */}
                                              <DistinctTable
                                                data={nationality.data}
                                                year={year.year}
                                                city={city.city}
                                                category={
                                                  subcategory.subcategory
                                                }
                                                totalMarketSize={
                                                  nationality.total_zone_market_size
                                                }
                                                nationality={
                                                  nationality.nationality
                                                }
                                                purchaseMode={purchaseMode}
                                                placeOfPurchase={
                                                  placeOfPurchase
                                                }
                                                monthsSelected={
                                                  this.props.months
                                                }
                                                zones={this.props.zones}
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div style={{ margin: "20px 0" }}>
                                {/* <Typography variant="h5">
                                  {_.capitalize(category.category)}
                                </Typography> */}
                                {console.log(category.nationality,"category.nationality")}
                                 
                                {category.nationality.map((nationality) => (
                                  <div
                                    key={uuidv4()}
                                    style={{ margin: "20px 0" }}
                                  >
                                    {/* <Typography variant="h6">
                                      {nationality.nationality}
                                    </Typography> */}

                                    <DistinctTable
                                      data={nationality.data}
                                      allNationality={true}
                                      allNationalityNames={category.nationality}
                                      category={category.category}
                                      year={year.year}
                                      city={city.city}
                                      nationality={nationality.nationality}
                                      totalMarketSize={
                                        nationality.total_zone_market_size
                                      }
                                      purchaseMode={purchaseMode}
                                      placeOfPurchase={placeOfPurchase}
                                      monthsSelected={this.props.months}
                                      zones={this.props.zones}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            ))}
          </div>
        );
      } else if (displayMode === "zones") {
        return (
          <div>
            {data.map((division) => (
              <div key={uuidv4()}>
                <>
                  {division.map((year) => (
                    <div
                      key={uuidv4()}
                      // style={{ maxHeight: "70vh", overflowY: "auto" }}
                    >
                      {/* <h3>Market Size for</h3>
                      <Typography variant="h3">
                        {_.capitalize(year.year)}
                      </Typography> */}
                      {year.hasOwnProperty("data")
                        ? year.data.map((city) => (
                          <div style={{ margin: "20px 0" }} key={uuidv4()}>
                            <ZoneTable
                              propertyName="category"
                              data={city.market_data}
                              year={year.year}
                              // category={category.category}
                              months={this.props.months}
                              city={city.city}
                              purchaseMode={purchaseMode}
                              nationalities={this.props.nationalities}
                              placeOfPurchase={placeOfPurchase}
                              zones={this.props.zones}
                            />
                          </div>
                        ))
                        : year.cities.map((city) => (
                          <div style={{ margin: "20px 0" }} key={uuidv4()}>
                            {city.categories.map((category) => (
                              <div
                                style={{ margin: "20px 0" }}
                                key={uuidv4()}
                              >
                                <Typography variant="h3">
                                  {_.capitalize(category.category)}
                                </Typography>
                                {!category.subcategories[0].hasOwnProperty(
                                  "subsubcategories"
                                ) ? (
                                  <ZoneTable
                                    propertyName="subcategory"
                                    data={category.subcategories}
                                    year={year.year}
                                    city={city.city}
                                    category={category.category}
                              placeOfPurchase={placeOfPurchase}
                                    nationalities={this.props.nationalities}
                                    purchaseMode={purchaseMode}
                                   
                                    zones={this.props.zones}
                                    months={this.props.months}
                                  />
                                ) : (
                                  category.subcategories.map(
                                    (subcategory) => (
                                      <div
                                        style={{ margin: "20px 0" }}
                                        key={uuidv4()}
                                      >
                                        <Typography variant="h4">
                                          {subcategory.subcategory}
                                        </Typography>
                                        <ZoneTable
                                          propertyName="subsubcategory"
                                          data={subcategory.subsubcategories}
                                          year={year.year}
                                          category={category.category}
                                       
                                          city={city.city}
                                          placeOfPurchase={placeOfPurchase}
                                          nationalities={
                                            this.props.nationalities
                                          }
                                          purchaseMode={purchaseMode}
                                          placeOfPurchase={placeOfPurchase}
                                          months={this.props.months}
                                          zones={this.props.zones}
                                        />
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                  ))}
                </>
              </div>
            ))}
          </div>
        );
      } else if (displayMode === "nationality") {
        console.log(data);
        return (
          <div style={{ textAlign: "center" }}>
            {/* hel?lllllllllllo */}
            {data.map((division) => (
              
              <div key={uuidv4()}>
                 <Carousel
                  key={uuidv4()}
                  autoPlay={false}
                  indicators={false}
                  swipe={false}
                  style={{ textAlign: "center" }}
                  timeout={100}
                  navButtonsAlwaysVisible
                  animation="slide"
                  navButtonsProps={{
                    style: {
                      opacity: 0.9,
                    },
                  }}
                >
                {division.map((year) => (
                  <div key={uuidv4()}>
                    {year.cities.map((city) =>
                      city.categories.map((category) => (
                        <div key={uuidv4()} style={{ margin: "20px 4rem" }}>
                          {category.hasOwnProperty("data") ? (
                            <NationalityTable
                              data={category.data}
                              year={year.year}
                              months={this.props.months}
                              city={city.city}
                              purchaseMode={purchaseMode}
                              placeOfPurchase={placeOfPurchase}
                              category={category.category}
                              nationalities={this.props.nationalities}
                              zones={this.props.zones}
                            />
                          ) : (
                            category.subcategories.map((subcategory) => (
                              <div key={uuidv4()}>
                                <Typography variant="h4">
                                  {subcategory.subcategory}
                                </Typography>
                                {subcategory.hasOwnProperty("data") ? (
                                  <NationalityTable
                                    data={subcategory.data}
                                    year={year.year}
                                    city={city.city}
                                    category={subcategory.subcategory}
                                    purchaseMode={purchaseMode}
                                    nationalities={this.props.nationalities}
                                    placeOfPurchase={placeOfPurchase}
                                    months={this.props.months}
                                    zones={this.props.zones}
                                  />
                                ) : (
                                  subcategory.subsubcategories.map(
                                    (subsubcategory) => (
                                      <div
                                        style={{ margin: "20px 0" }}
                                        key={uuidv4()}
                                      >
                                        <Typography variant="h5">
                                          {subsubcategory.subsubcategory}
                                        </Typography>
                                        <NationalityTable
                                          data={subsubcategory.data}
                                          year={year.year}
                                          city={city.city}
                                          nationalities={
                                            this.props.nationalities
                                          }
                                          purchaseMode={purchaseMode}
                                          placeOfPurchase={placeOfPurchase}
                                          months={this.props.months}
                                          zones={this.props.zones}
                                          category={subsubcategory.subcategory}
                                        />
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      ))
                    )}
                  </div>
                ))}
                </Carousel>
              </div>
            ))}
          </div>
        );
      } else if (displayMode === "nationality_new") {
        console.log("HEREEEE");
        console.log(data);
        return (
          <div style={{ textAlign: "center" }}>
            {data.data.nationality_distribution[0].map((division) => (
              <div key={uuidv4()}>
                <div key={uuidv4()}>
                  <div key={uuidv4()} style={{ margin: "20px 0" }}>
                    <Typography variant="h3">
                      {_.capitalize(division.category)}
                    </Typography>
                    <NationalityTable
                      data={division.zone_data}
                      year={division.year}
                      city={division.city}
                      purchaseMode={purchaseMode}
                      nationalities={this.props.nationalities}
                      placeOfPurchase={placeOfPurchase}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      }
    } else
      return (
        <div
          style={{
            height: "80%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FactsLoader />
        </div>
      );
  }
}

export default Tables;

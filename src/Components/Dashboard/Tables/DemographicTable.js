import React, { Component } from 'react'
import * as _ from 'lodash';
import DistinctTable from './DistinctTable'
import ZoneTable from './ZoneTable'
import NationalityTableDemo from './NationalityTableDemo'
import Typography from '@material-ui/core/Typography'
import PopulationTableDemo from './PopulationTableDemo'
import BachelorsTableDemo from './BachelorsTableDemo'
import IncomeTableDemo from './IncomeTableDemo'
import LabourersTableDemo from './LabourersTableDemo'
import CapitaTableDemo from './CapitaTableDemo'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { v4 as uuidv4 } from 'uuid';

export class DemographicTables extends Component {
    constructor(props) {
        super(props)

        //optionData is the raw data received from the backend
        //All other array variables are used to render the menu
        //postObject is the object that gets constructed for POST 

        this.state = {
            loading: false,
        }
    }
    // componentDidMount() {
    //     console.log("SHOWingDEMO")
    //     console.log(this.props)
    //     this.setState({loading:false})
    // }
    render() {
        console.log("SHOWDATA DEMO")
        console.log(this.props)
        const data = this.props.data;
        const displayMode = this.props.displayMode;
        if (this.props.data) {
        if (this.props.data.nationality_distribution) {
            console.log("LOOOOOK DEMO")
            console.log(data)
             if (displayMode === "nationality_new") {
                console.log("HEREEEE")
                // console.log(this.props.data.nationality_distribution[0].zone_data)
                return (
                    <div style={{ textAlign: 'center' }}>
                        {this.props.data.nationality_distribution.map(division =>
                            <div key={uuidv4()}>
                             
                                    <div key={uuidv4()}>
                                     
                                                <div key={uuidv4()} style={{ margin: '20px 0' }}>
                                                    <Typography variant="h3">{"Nationality Distribution"}</Typography>
                                                    <NationalityTableDemo data={division.zone_data} year={division.year} city={division.city} nation={division.zone_data[0].nationality_data} />
                                                        
                                             
                                                    
                                                </div>
                                           
                                    </div>
                               
                            </div>
                        )
                        }
                    </div>
                )
            }
        }
        if (this.props.data.population) {
            console.log("LOOOOOK DEMO population")
            console.log(data)
             if (displayMode === "nationality_new") {
                console.log("HEREEEE")
                // console.log(this.props.data.nationality_distribution[0].zone_data)
                return (
                    <div style={{ textAlign: 'center' }}>
                        {this.props.data.population.map(division =>
                            <div key={uuidv4()}>
                             
                                    <div key={uuidv4()}>
                                     
                                                <div key={uuidv4()} style={{ margin: '20px 0' }}>
                                                    <Typography variant="h3">{_.capitalize(division.category)}</Typography>
                                                    <PopulationTableDemo data={division.zone_data} year={division.year} city={division.city} nation={division.zone_data[0].data} />
                                                        
                                             
                                                    
                                                </div>
                                           
                                    </div>
                               
                            </div>
                        )
                        }
                    </div>
                )
            }
        }  

    
    if (this.props.data.bachelors) {
        console.log("LOOOOOK DEMO bachelors")
        console.log(data)
         if (displayMode === "nationality_new") {
            console.log("HEREEEE")
            // console.log(this.props.data.nationality_distribution[0].zone_data)
            return (
                <div style={{ textAlign: 'center' }}>
                    {data.bachelors.map(division =>
                        <div key={uuidv4()}>
                         
                                <div key={uuidv4()}>
                                 
                                            <div key={uuidv4()} style={{ margin: '20px 0' }}>
                                                <Typography variant="h3">{_.capitalize("Percentage Without Families but not Labourers")}</Typography>
                                                <BachelorsTableDemo data={division.zone_data} year={division.year} city={division.city} nation={division.bachelor_percent} />
                                                    
                                         
                                                
                                            </div>
                                       
                                </div>
                           
                        </div>
                    )
                    }
                </div>
            )
        }
    }  

    if (this.props.data.income_check) {
        console.log("LOOOOOK DEMO income")
        console.log(data)
         if (displayMode === "nationality_new") {
            console.log("HEREEEE")
            // console.log(this.props.data.nationality_distribution[0].zone_data)
            return (
                <div style={{ textAlign: 'center' }}>
                    {this.props.data.income_check.map(division =>
                        <div key={uuidv4()}>
                         
                                <div key={uuidv4()}>
                                 
                                            <div key={uuidv4()} style={{ margin: '20px 0' }}>
                                                <Typography variant="h3">{"Income Levels (USD)"}</Typography>
                                                <IncomeTableDemo data={division.zone_data} year={division.year} city={division.city} nation={division.nationality_list} />
                                                    
                                         
                                                
                                            </div>
                                       
                                </div>
                           
                        </div>
                    )
                    }
                </div>
            )
        }
    }  
    if (this.props.data.labourers) {
        console.log("LOOOOOK DEMO labourers")
        console.log(data)
         if (displayMode === "nationality_new") {
            console.log("HEREEEE")
            // console.log(this.props.data.nationality_distribution[0].zone_data)
            return (
                <div style={{ textAlign: 'center' }}>
                    {data.labourers.map(division =>
                        <div key={uuidv4()}>
                         
                                <div key={uuidv4()}>
                                 
                                            <div key={uuidv4()} style={{ margin: '20px 0' }}>
                                                <Typography variant="h3">{_.capitalize("Percentage Labourers")}</Typography>
                                                <LabourersTableDemo data={division.zone_data} year={division.year} city={division.city}/>
                                                    
                                         
                                                
                                            </div>
                                       
                                </div>
                           
                        </div>
                    )
                    }
                </div>
            )
        }
    }
    if (this.props.data.capita) {
        console.log("LOOOOOK DEMO capita")
        console.log(data)
         if (displayMode === "nationality_new") {
            console.log("HEREEEE")
            // console.log(this.props.data.nationality_distribution[0].zone_data)
            return (
                <div style={{ textAlign: 'center' }}>
                    {this.props.data.capita.map(division =>
                        <div key={uuidv4()}>
                         
                                <div key={uuidv4()}>
                                 
                                            <div key={uuidv4()} style={{ margin: '20px 0' }}>
                                                <Typography variant="h3">{"Retail Spend per Capita per Annum"}</Typography>
                                                <Typography variant="h5">{division.category} (USD)</Typography>
                                                <CapitaTableDemo data={division.category_data} year={division.year} city={division.city} nation={division.category_data[0].category_data} />
                                                    
                                         
                                                
                                            </div>
                                       
                                </div>
                           
                        </div>
                    )
                    }
                </div>
            )
        }
    }    
        }

        else 
        console.log("SDEMO")
        console.log(this.props)
        return (
            
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader
                    type="Grid"
                    color="#00BFFF"
                    height={80}
                    width={80}
                />
            </div >
        )
    }
}

export default DemographicTables



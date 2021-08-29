import React from 'react';
import Card from './Card'

const Cards = (props) => {
    return (
        <div className="cardsRow">

            <Card link={'demographic'} headingClass="cardHeading" icon="fa fa-users" heading="DEMOGRAPHIC INFORMATION" body="View key demographic information such as income, nationality, age distribution - at a neighbourhood
                    level"/>
            <Card link={'dashboard'} headingClass="cardHeadingBig" icon="fa fa-arrows-alt" heading="DETAILED MARKET SIZE BY CATEGORY BY NEIGHBOURHOOD" body="View market sizes of 50+ categories - by neighbourhood and / or nationality" />
            <Card link={'map'} headingClass="cardHeading" icon="fa fa-info" heading="CATCHMENTS ANALYSIS / RETAIL INTELLIGENCE" body="Assess your chosen site/s or choosing potential site/s based on demographic / market size criteria"></Card>
            <Card headingClass="cardHeading" icon="fa fa-map" heading="CITY REPORTS" body="View key demographic information such as income, nationality, age distribution - at a neighbourhood
                level"/>
            <Card headingClass="cardHeading" icon="fa fa-plane" heading="TOURIST RELATED INFORMATION" body="Get access to inbound tourist statistics - volume and retail spend - at a nationality level" />

        </div>
    );
}

export default Cards;
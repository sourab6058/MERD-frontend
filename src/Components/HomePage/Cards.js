import React from 'react';
import Card from './Card'

const Cards = (props) => {
    return (
        <div className="cards-container">
            <Card link={'demographic'} imgSrc="https://cdn.pixabay.com/photo/2014/09/07/21/52/city-438393_1280.jpg" imgOnRight={true} headingClass="cardHeading" icon="fa fa-users" heading="DEMOGRAPHIC INFORMATION" body="View key demographic information such as income, nationality, age distribution - at a neighbourhood
                    level"/>
            <Card link={'dashboard'}imgSrc=" https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg" imgOnRight={false}headingClass="cardHeadingBig" icon="fa fa-arrows-alt" heading="DETAILED MARKET SIZE BY CATEGORY BY NEIGHBOURHOOD" body="View market sizes of 50+ categories - by neighbourhood and / or nationality" />
            <Card link={'map'} imgSrc="https://cdn.pixabay.com/photo/2016/03/17/23/00/europe-1264062_1280.jpg" imgOnRight={true} headingClass="cardHeading" icon="fa fa-info" heading="CATCHMENTS ANALYSIS / RETAIL INTELLIGENCE" body="Assess your chosen site/s or choosing potential site/s based on demographic / market size criteria"></Card>
            <Card imgSrc="https://cdn.pixabay.com/photo/2016/06/03/13/57/digital-marketing-1433427_1280.jpg" imgOnRight={false}headingClass="cardHeading" icon="fa fa-map" heading="CITY REPORTS" body="View key demographic information such as income, nationality, age distribution - at a neighbourhood
                level"/>
            <Card imgSrc="https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014617_1280.jpg" imgOnRight={true}headingClass="cardHeading" icon="fa fa-plane" heading="TOURIST RELATED INFORMATION" body="Get access to inbound tourist statistics - volume and retail spend - at a nationality level" />

        </div>
    );
}

export default Cards;
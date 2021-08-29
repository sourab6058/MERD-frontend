const nationalitycsv = (csvData) => {

    const headers = ['Zones', 'Market Size'];
    const emptyRow = ['', ''];
    const resultArray = [];

    csvData.forEach(division => {

        division.forEach(year => {
            year.cities.forEach(city => {
                city.categories.forEach(category => {
                    resultArray.push([category.category, ''])
                    if (category.hasOwnProperty('data')) {

                        resultArray.push(headers)
                        category.data.forEach(zone => {
                            resultArray.push([zone.zone, zone.total_market_size])
                        })
                        resultArray.push([`(${year.year} - ${city.city})`, ''])
                        resultArray.push(emptyRow)

                    } else {

                        category.subcategories.forEach(subcategory => {
                            resultArray.push([subcategory.subcategory, ''])
                            if (subcategory.hasOwnProperty('data')) {

                                resultArray.push(headers)
                                subcategory.data.forEach(zone => {
                                    resultArray.push([zone.zone, zone.total_market_size])
                                })
                                resultArray.push([`(${year.year} - ${city.city})`, ''])
                                resultArray.push(emptyRow)
                            } else {

                                subcategory.subsubcategories.forEach(subsubcategory => {

                                    resultArray.push([subsubcategory.subsubcategory, ''])
                                    resultArray.push(headers)
                                    subsubcategory.data.forEach(zone => {
                                        resultArray.push([zone.zone, zone.total_market_size])
                                    })
                                    resultArray.push([`(${year.year} - ${city.city})`, ''])
                                    resultArray.push(emptyRow)
                                })

                            }
                        })

                    }
                })
            })
        })

    })

    console.log(resultArray);
    return resultArray;

}

export default nationalitycsv;
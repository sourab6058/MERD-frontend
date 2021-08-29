const zonescsv = (csvData) => {

    const headers = ['Category', 'Market Size'];
    const emptyRow = ['', ''];
    const resultArray = [];

    csvData.forEach(division => {
        division.forEach(year => {
            if (year.hasOwnProperty('data')) {

                year.data.forEach(city => {
                    resultArray.push(headers);
                    city.market_data.forEach(category => {
                        resultArray.push([category.category, category.total_market_size])
                    })
                    resultArray.push([`(${year.year} - ${city.city})`, ''])
                    resultArray.push(emptyRow)
                })

            } else {

                year.cities.forEach(city => {
                    city.categories.forEach(category => {
                        resultArray.push([category.category, ''])

                        if (category.subcategories[0].hasOwnProperty('total_market_size')) {

                            resultArray.push(headers)
                            category.subcategories.forEach(subcategory => {
                                resultArray.push([subcategory.subcategory, subcategory.total_market_size])
                            })
                            resultArray.push([`(${year.year} - ${city.city})`, ''])
                            resultArray.push(emptyRow)

                        } else {

                            category.subcategories.forEach(subcategory => {
                                resultArray.push([subcategory.subcategory, ''])
                                resultArray.push(headers)
                                subcategory.subsubcategories.forEach(subsubcategory => {
                                    resultArray.push([subsubcategory.subsubcategory, subsubcategory.total_market_size])
                                })
                                resultArray.push([`(${year.year} - ${city.city})`, ''])
                                resultArray.push(emptyRow)
                            })

                        }

                    })
                })

            }
        })
    })

    console.log(resultArray);
    return resultArray;
}

export default zonescsv;
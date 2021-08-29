import distinctcsv from './distinctcsv';
import zonescsv from './zonescsv';
import nationalitycsv from './nationalitycsv';

const rendercsv = (csvData, months, displayMode) => {

    switch (displayMode) {
        case 'distinct':
            return distinctcsv(csvData, months);
        case 'zones':
            return zonescsv(csvData);
        case 'nationality':
            return nationalitycsv(csvData);

        default:
            console.log('default reached')
    }

}

export default rendercsv;
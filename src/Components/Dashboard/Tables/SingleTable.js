import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const monthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
}

let monthTotals = [];

export class SingleTable extends Component {

    calculateMonthTotals = (data, months) => {
        monthTotals = [];

        months.forEach(month => {

            let monthTotal = 0;

            data.forEach(row => {
                row.month.forEach(months => {
                    if (months.month === month) {
                        monthTotal = monthTotal + months.market_size
                    }
                })
            })
            monthTotals.push(monthTotal)
        })
    }

    render() {
        if (this.props.data.length > 0) {
            let empty = true;
            this.props.data.forEach(obj => {
                if (obj.total_market_size > 0) empty = false;
            })
            if (!empty) {
                const data = this.props.data

                data.forEach(data => {

                    data.month.sort((a, b) => (a.month > b.month) ? 1 : -1)

                })

                let months = this.props.months;
                months.sort();

                this.calculateMonthTotals(data, months)

                return (
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" size="small">
                            <caption>{`Market Size data of ${this.props.city} for ${this.props.year}`}</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Zone</TableCell>
                                    {months.map(month => <TableCell key={month} align="right">{monthNames[month]}</TableCell>)}
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.zone}
                                        </TableCell>
                                        {row.month.length > 0 ? months.map((month, index) => row.month[index] && month === row.month[index].month ? <TableCell align="right">{row.month[index].market_size}</TableCell> : <TableCell align="right">0</TableCell>)
                                            : months.map(month => <TableCell align="right">0</TableCell>)}
                                        <TableCell align="right">{row.total_market_size}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    {monthTotals.map(monthTotal => <TableCell key={monthTotal} align="right">{monthTotal}</TableCell>)}
                                    <TableCell align="right">{this.props.totalMarketSize}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            } else return (<h4 style={{ color: 'red' }}>Data Not Available yet</h4>)
        } else return (<h3 style={{ color: 'green' }}>Loading...</h3>)
    }
}

export default SingleTable

import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { v4 as uuidv4 } from 'uuid';

class DistinctTableDemo extends Component {

    render() {
        console.log("HERE")
        console.log(this.props)
        if (this.props.data.length > 0) {
            let empty = false;
            // this.props.data.forEach(obj => {
            //     if (obj.total_market_size > 0) empty = false;
            // })
            if (!empty) {
                const { data, year, city } = this.props;

                data.sort((a, b) => (parseInt(a.zone) > parseInt(b.zone)) ? 1 : -1)

                return (
                    <TableContainer component={Paper} style={{ width: '70%', margin: '0 auto' }}>
                        <Table aria-label="simple table" size="small">
                            <caption>{`Demographic data of ${city} for the year ${year}`}</caption>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Zones</TableCell>
                                    {this.props.nation.map((row)=>
                        <TableCell align="right">{row.nationality}</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={uuidv4()}>
                                        <TableCell component="th" scope="row">
                                            {`Zone ${row.zone}`}
                                        </TableCell>

                                {row.nationality_data.map((row2)=>
                                     <TableCell align="right">{row2.percentage}</TableCell>
                                )}
                                        {/* <TableCell align="right">{row.total_market_size === 0 ? "Not Available" : row.total_market_size}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            } else return (<h4 style={{ color: 'red' }}>Data Not Available Yet</h4>)
        } else return (<h4 style={{ color: 'green' }}>{`Data not avaible yet for ${this.props.city} for the year ${this.props.year}`}</h4>)
    }
}

export default DistinctTableDemo

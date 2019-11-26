import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/styles';

const columns = [
    { id: 'rank', label: '排名', maxWidth: 80, align: 'center', },
    { id: 'portrait', label: '球員', maxWidth: 140, align: 'right', },
    { id: 'fullname', label: '', maxWidth: 120, align: 'left', },
    { id: 'chTeamName', label: '球隊', maxWidth: 120, align: 'center', },
    { id: 'score', label: '場均', maxWidth: 120, align: 'center', },
];

const styles = theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        // maxHeight: 690,
        height:'97vh',
        overflow: 'auto',
    },
    row: {
        maxHeight: 55,
    },
    cell: {
        padding: 5,
    },
    img: {
        width: 40,
    }
});

class StickyPlayerTable extends Component {
    render() {
        const { data, classes } = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        className={classes.cell}
                                        key={column.id}
                                        align={column.align}
                                        style={{ maxWidth: column.maxWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(row => {
                                return (
                                    <TableRow className={classes.row} hover tabIndex={-1} key={row.rank}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell className={classes.cell} key={column.id} align={column.align}>
                                                    {column.id === 'portrait' ? <img className={classes.img} src={value} alt={row.fullname} /> : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(StickyPlayerTable);
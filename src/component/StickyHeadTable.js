import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";
import { initTeamData } from "../redux/action";
import { withStyles } from '@material-ui/styles';

const columns = [
  { id: 'conferencerank', label: '排名', maxWidth: 80, align: 'center', },
  { id: 'teamLogo', label: '球隊', maxWidth: 140, image: true, align: 'center', },
  { id: 'wins', label: '勝', maxWidth: 120, align: 'center', },
  { id: 'losses', label: '負', maxWidth: 120, align: 'center', },
  { id: 'winpct', label: '勝率', maxWidth: 120, align: 'center', },
  { id: 'gamesbehindconference', label: '勝差', maxWidth: 120, align: 'center', },
];

const styles = theme => ({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 490,
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

class StickyHeadTable extends Component {
  componentDidMount() {
    const { onInitTeamData } = this.props;
    onInitTeamData();
  }
  render() {
    const { teamData, region, classes } = this.props;
    const regionTeamData = teamData.filter(team => team.conference === region).sort((a, b) => parseInt(a.conferencerank) - parseInt(b.conferencerank));
    const regionName = region === 'WESTERN' ? '西部' : '東部';
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
                    {column.id === 'conferencerank' ? regionName : column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {regionTeamData.map(row => {
                return (
                  <TableRow className={classes.row} hover tabIndex={-1} key={row.teamname}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell className={classes.cell} key={column.id} align={column.align}>
                          {column.image ? <img className={classes.img} src={value} alt={row.teamname}/> : value}
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

const mapStateToProps = state => {
  return {
    teamData: state.teamData
  }
};

const mapDispatchToProps = {
  onInitTeamData: initTeamData
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(StickyHeadTable));
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import { connect } from "react-redux";
import { initPlayerData } from "../redux/action";
import { withStyles } from '@material-ui/styles';
import { rankName } from '../util/rankName';
import StickyPlayerTable from './StickyPlayerTable';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '97vh',
    display: 'flex',
  },
  bar: {
    width: 'auto',
  },
  tabPanel: {
    width: '100%',
  }
});

class ScrollableTabsButtonForce extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.getPlayerRankData = this.getPlayerRankData.bind(this);
  }

  componentDidMount() {
    const { onInitPlayerData } = this.props;
    onInitPlayerData();
  }

  handleTabChange = (e, newValue) => {
    this.setState({ value: newValue });
  };

  getPlayerRankData() {
    const { playerData } = this.props;
    let playerRankData = {};
    const keys = Object.keys(rankName);
    keys.forEach(
      (key) => {
        if (playerData[key]) {
          playerRankData[rankName[key]] = playerData[key].slice(0, 30);
        }
      });
    return playerRankData;
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const playerRankData = this.getPlayerRankData();
    const keys = Object.keys(playerRankData);

    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleTabChange}
            variant="scrollable"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            orientation="vertical"
          >
            {keys.map((key) => {
              return (<Tab label={key} key={key}/>);
            })}
          </Tabs>
        </AppBar>
        {keys.map((key, i) => {
              return (
                <TabPanel className={classes.tabPanel} value={value} index={i} key={key}>
                  <StickyPlayerTable data={playerRankData[key]}/>
                </TabPanel>
              );
            })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerData: state.playerData
  }
};

const mapDispatchToProps = {
  onInitPlayerData: initPlayerData
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableTabsButtonForce));
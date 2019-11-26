import React, { Component } from 'react';
import { connect } from "react-redux";
import { initTeamData } from "../redux/action";
import MuiVirtualizedTable from './MuiVirtualizedTable';
import Paper from '@material-ui/core/Paper';

class TeamRank extends Component {
    constructor(props) {
        super(props);
        this.getTeamRank = this.getTeamRank.bind(this);
    }

    componentDidMount() {
        const { onInitTeamData } = this.props;
        onInitTeamData();
    }

    getTeamRank(region) {
        const { teamData } = this.props;
        const regionTeamData = teamData.filter(team => team.conference === region).sort((a, b) => parseInt(a.conferencerank) - parseInt(b.conferencerank));
        return (
            <Paper style={{ height: 400, width: '100%' }}>
                <MuiVirtualizedTable
                    rowCount={regionTeamData.length}
                    rowGetter={({ index }) => regionTeamData[index]}
                    columns={[
                        {
                            width: 80,
                            label: '排名',
                            dataKey: 'conferencerank',
                            numeric: true,
                        },
                        {
                            width: 140,
                            label: '球隊',
                            dataKey: 'teamLogo',
                            image: true,
                        },
                        {
                            width: 120,
                            label: '勝',
                            dataKey: 'wins',
                            numeric: true,
                        },
                        {
                            width: 120,
                            label: '負',
                            dataKey: 'losses',
                            numeric: true,
                        },
                        {
                            width: 120,
                            label: '勝率',
                            dataKey: 'winpct',
                            numeric: true,
                        },
                    ]}
                />
            </Paper>
        );
    }

    render() {
        return (
            <div>
                {this.getTeamRank('WESTERN')}
                {this.getTeamRank('EASTERN')}
            </div>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamRank);
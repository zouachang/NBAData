import { INIT_TEAM_DATA, INIT_PLAYER_DATA } from "./actionTypes";
import axios from 'axios';

export const initTeamData = () => {
    return dispatch => {
        return (

            axios.get('/vms-worldcup/competition-rank/team-scoreboard/2221402/REG', {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(
                    (res) => {
                        if (res.data.code === 200 && res.data.body && res.data.body.standings) {
                            dispatch(initTeamDataAction(res.data.body.standings));
                        }
                    })
                .catch(
                    (e) => {
                        dispatch(initTeamDataAction([]));
                    })
        )
    }
};

export const initPlayerData = () => {
    return dispatch => {
        return (
            axios.get('/vms-worldcup/competition-rank/player-season-rank/2/REG/2221402/2/1')
                .then(
                    (res) => {
                        if (res.data.code === 200 && res.data.body && res.data.body) {
                            dispatch(initPlayerDataAction(res.data.body));
                        }
                    })
                .catch(
                    (e) => {
                        dispatch(initPlayerDataAction({}));
                    })
        )
    }
};

const initTeamDataAction = teamData => ({
    type: INIT_TEAM_DATA,
    teamData
});

const initPlayerDataAction = playerData => ({
    type: INIT_PLAYER_DATA,
    playerData
});
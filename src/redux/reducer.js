import { INIT_TEAM_DATA, INIT_PLAYER_DATA } from "./actionTypes";

const initialState = {
  teamData: [],
  playerData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_TEAM_DATA: {
      return {
        ...state,
        teamData: action.teamData
      };
    }
    case INIT_PLAYER_DATA: {
      return {
        ...state,
        playerData: action.playerData
      };
    }
    default:
      return state;
  }
}
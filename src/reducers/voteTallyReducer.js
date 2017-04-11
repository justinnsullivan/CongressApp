import {
    SELECT_ROLL_CALL,
    REQUEST_VOTE_TALLY,
    RECEIVE_VOTE_TALLY,
} from '../actions/voteTally';


export const selectedRollCall = (rollCall = 0, action) => {
    switch (action.type) {
        case SELECT_ROLL_CALL:
            return action.rollCall;
        default:
            return rollCall;
    }
};

export const vote_tally = (state = {
    isFetchingTally: false,
    tally: {},
}, action) => {
    switch (action.type) {
        case REQUEST_VOTE_TALLY:
            return {
                ...state,
                isFetchingTally: true,
            };
        case RECEIVE_VOTE_TALLY:
            return {
                ...state,
                isFetchingTally: false,
                tally: action.vote_tally,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

export const tallyByRollCall = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_VOTE_TALLY:
        case REQUEST_VOTE_TALLY:
            var num = action.rollCall;
            if (action.chamber === 'house') {
                num = num * -1;
            }
            return {
                ...state,
                [num]: vote_tally(state[num], action),
            };
        default:
            return state;
    }
};

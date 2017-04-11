import {
    SELECT_VOTE_DATE,
    REQUEST_RECENT_VOTES,
    RECEIVE_RECENT_VOTES,
} from '../actions/votes';


export const selectedDayNum = (state = 20, action) => {
    switch (action.type) {
        case SELECT_VOTE_DATE:
            return action.numDays;
        default:
            return state;
    }
};

export const recVotes = (state = {
    isFetchingVotes: false,
    vts: {},
}, action) => {
    switch (action.type) {
        case REQUEST_RECENT_VOTES:
            return {
                ...state,
                isFetchingVotes: true,
            };
        case RECEIVE_RECENT_VOTES:
            return {
                ...state,
                isFetchingVotes: false,
                vts: action.recVotes,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

export const votesByDayNum = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RECENT_VOTES:
        case REQUEST_RECENT_VOTES:
            var num = action.numDays;
            if (action.chamber === 'house') {
                num += 100;
            }
            return {
                ...state,
                [num]: recVotes(state[num], action),
            };
        default:
            return state;
    }
};

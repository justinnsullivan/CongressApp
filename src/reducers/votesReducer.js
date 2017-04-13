import {
    SELECT_VOTE_DATE,
    REQUEST_RECENT_VOTES,
    RECEIVE_RECENT_VOTES,
} from '../actions/votes';


export const selectedDate = (date = new Date(), action) => {
    switch (action.type) {
        case SELECT_VOTE_DATE:
            return action.date;
        default:
            return date;
    }
};

export const recVotes = (state = {
    isFetchingVotes: false,
    vts: [],
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

export const votesByChamber = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RECENT_VOTES:
        case REQUEST_RECENT_VOTES:
            return {
                ...state,
                [action.chamber]: recVotes(state[action.chamber], action),
            };
        default:
            return state;
    }
};

export const SELECT_ROLL_CALL = 'SELECT_ROLL_CALL';
export const REQUEST_VOTE_TALLY = 'REQUEST_VOTE_TALLY';
export const RECEIVE_VOTE_TALLY = 'RECEIVE_VOTE_TALLY';


export const selectRollCall = rollCall => ({
    type: SELECT_ROLL_CALL,
    rollCall,
});

export const requestVoteTally = (rollCall,chamber) => ({
    type: REQUEST_VOTE_TALLY,
    rollCall,
    chamber
});

export const receiveVoteTally = (rollCall, chamber, json) => ({
        type: RECEIVE_VOTE_TALLY,
        rollCall,
        chamber,
        vote_tally: json.results,
        receivedAt: Date.now(),
});

const fetchTally = (rollCall, chamber) => (dispatch) => {
    dispatch(requestVoteTally(rollCall));
    var req = new Request(`https://api.propublica.org/congress/v1/115/${chamber}/sessions/1/votes/${rollCall}.json`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(receiveVoteTally(rollCall, chamber, json)));
};

const shoudFetchVoteTally = (state, rollCall, chamber) => {
    const votes = state.recentVotes;
    if (!votes) {
        return true;
    }
    if (votes.isFetching) {
        return false;
    }
    return votes.didInvalidate;
};


export const fetchVoteTallyIfNeeded = (rollCall,chamber) => (dispatch, getState) => {
    if (shoudFetchVoteTally(getState(), rollCall, chamber) && rollCall !== 0) {
        return dispatch(fetchTally(rollCall, chamber));
    }
};

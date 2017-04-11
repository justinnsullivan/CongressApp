export const SELECT_VOTE_DATE = 'SELECT_VOTE_DATE';
export const REQUEST_RECENT_VOTES = 'REQUEST_RECENT_VOTES';
export const RECEIVE_RECENT_VOTES = 'RECEIVE_RECENT_VOTES';


export const selectNumDays = numDays => ({
    type: SELECT_VOTE_DATE,
    numDays,
});

export const requestRecentVotes = (numDays,chamber) => ({
    type: REQUEST_RECENT_VOTES,
    numDays,
    chamber
});

export const receiveRecentVotes = (numDays, chamber, json) => ({
    type: RECEIVE_RECENT_VOTES,
    numDays,
    chamber,
    recVotes: json.results,
    receivedAt: Date.now(),
});


const fetchVotes = (numDays, chamber) => (dispatch) => {
    var today = (new Date()).toISOString().split('T')[0];
    var before = new Date();
    before.setDate(before.getDate()-numDays)
    before = before.toISOString().split('T')[0]
    var req = new Request(`https://api.propublica.org/congress/v1/${chamber}/votes/${before}/${today}`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(receiveRecentVotes(numDays, chamber, json)));
};

const shouldFetchRecentVotes = (state, numDays) => {
    const votes = state.recentVotes;
    if (!votes) {
        return true;
    }
    if (votes.isFetching) {
        return false;
    }
    return votes.didInvalidate;
};


export const fetchRecentVotesIfNeeded = (numDays, chamber, force = false) => (dispatch, getState) => {
    if (force === true || shouldFetchRecentVotes(getState(), numDays)) {
        return dispatch(fetchVotes(numDays, chamber));
    }
};

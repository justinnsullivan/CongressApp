export const SELECT_VOTE_DATE = 'SELECT_VOTE_DATE';
export const REQUEST_RECENT_VOTES = 'REQUEST_RECENT_VOTES';
export const RECEIVE_RECENT_VOTES = 'RECEIVE_RECENT_VOTES';


export const selectDate = date => ({
    type: SELECT_VOTE_DATE,
    date,
});

export const requestRecentVotes = (date, prevVotes, chamber) => ({
    type: REQUEST_RECENT_VOTES,
    date,
    prevVotes,
    chamber
});

export const receiveRecentVotes = (date, prevVotes, chamber, json) => {
    return {type: RECEIVE_RECENT_VOTES,
    date,
    chamber,
    recVotes: prevVotes.concat(json.results['votes']),
    receivedAt: Date.now()};  
};


const fetchVotes = (date, prevVotes, chamber) => (dispatch) => {
    let before = date;
    let date2 = date.toISOString().split('T')[0];
    before.setDate(before.getDate()-30);
    before = before.toISOString().split('T')[0];
    let req = new Request(`https://api.propublica.org/congress/v1/${chamber}/votes/${before}/${date2}`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(receiveRecentVotes(date, prevVotes, chamber, json)));
};

const shouldFetchRecentVotes = (state, date) => {
    const votes = state.recentVotes;
    if (!votes) {
        return true;
    }
    if (votes.isFetchingVotes) {
        return false;
    }
    return votes.didInvalidate;
};


export const fetchRecentVotesIfNeeded = (date, prevVotes, chamber, force = false) => (dispatch, getState) => {
    if (force === true || shouldFetchRecentVotes(getState(), date)) {
        return dispatch(fetchVotes(date, prevVotes, chamber));
    }
};

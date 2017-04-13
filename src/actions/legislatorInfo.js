export const REQUEST_LEGISLATOR_INFO = 'REQUEST_LEGISLATOR_INFO';
export const RECEIVE_LEGISLATOR_INFO = 'RECEIVE_LEGISLATOR_INFO';
export const SELECT_LEGISLATOR_ID = 'SELECT_LEGISLATOR_ID';

export const selectLegislatordId = id => ({
    type: SELECT_LEGISLATOR_ID,
    id,
});

export const requestLegislatorInfo = id => ({
    type: REQUEST_LEGISLATOR_INFO,
    id,
});


export const recieveLegislatorInfo = (id, basic, bills) => ({
    type: RECEIVE_LEGISLATOR_INFO,
    id,
    legislator_info: {
        basic,
        bills
    },
    receivedAt: Date.now(),
});

const fetchLegislatorBills = (id, basic) => (dispatch) => {
    dispatch(requestLegislatorInfo(id));
    return fetch(`https://congress.api.sunlightfoundation.com/bills?sponsor_id__in=${id}`)
        .then(response => response.json())
        .then(json => dispatch(recieveLegislatorInfo(id, basic, json.results)));
};

const fetchLegislatorInfo = id => (dispatch) => {
    dispatch(requestLegislatorInfo(id));
    var req = new Request(`https://api.propublica.org/congress/v1/members/${id}.json`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(fetchLegislatorBills(id, json.results)));
};

const shouldFetchLegislatorInfo = (state, id) => {
    const legislatorInfo = state.legislatorInfoById[id];
    if (!legislatorInfo) {
        return true;
    }
    if (id === '' || legislatorInfo.isFetchingInfo) {
        return false;
    }
    else {
        return false;
    }
};


export const fetchLegislatorInfoIfNeeded = id => (dispatch, getState) => {
    if (shouldFetchLegislatorInfo(getState(), id)) {
        return dispatch(fetchLegislatorInfo(id));
    }
};

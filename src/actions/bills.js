export const SELECT_BILL_STATUS = 'SELECT_BILL_STATUS';
export const REQUEST_RECENT_BILLS = 'REQUEST_RECENT_BILLS';
export const RECEIVE_RECENT_BILLS = 'RECEIVE_RECENT_BILLS';


export const selectBillStatus = billStatus => ({
    type: SELECT_BILL_STATUS,
    billStatus,
});

export const requestRecentBills = (billStatus,chamber) => ({
    type: REQUEST_RECENT_BILLS,
    billStatus,
    chamber
});

export const receiveRecentBills = (billStatus, chamber, json) => ({
    type: RECEIVE_RECENT_BILLS,
    billStatus,
    chamber,
    recBills: json.results,
    receivedAt: Date.now(),
});


const fetchBills = (billStatus, chamber) => (dispatch) => {
    var req = new Request(`https://api.propublica.org/congress/v1/115/${chamber}/bills/${billStatus}.json`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(receiveRecentBills(billStatus, chamber, json)));
};

const shouldFetchRecentBills = (state, billStatus) => {
    const bills = state.billsByStatus[billStatus];
    if (!bills) {
        return true;
    }
    if (bills.isFetchingBills) {
        return false;
    }
    return bills.didInvalidate;
};


export const fetchRecentBillsIfNeeded = (billStatus, chamber, force = false) => (dispatch, getState) => {
    if (force === true || shouldFetchRecentBills(getState(), billStatus)) {
        return dispatch(fetchBills(billStatus, chamber));
    }
};

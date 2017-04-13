export const SELECT_BILL_ID = 'SELECT_BILL_ID';
export const REQUEST_BILL_INFO = 'REQUEST_BILL_INFO';
export const RECEIVE_BILL_INFO = 'RECEIVE_BILL_INFO';


export const selectBillId = billId => ({
    type: SELECT_BILL_ID,
    billId,
});

export const requestBillInfo = (billId) => ({
    type: REQUEST_BILL_INFO,
    billId
});

export const receiveBillInfo = (billId, bill, json) => {
    bill = bill.results[0];
    bill['subjects'] = json.results[0].subjects;
    return {
        type: RECEIVE_BILL_INFO,
        billId,
        billInfo: bill,
        receivedAt: Date.now(),
    }
};

const fetchBillSubjects = (billId, bill) => (dispatch) => {
    var req = new Request(`https://api.propublica.org/congress/v1/114/bills/${billId}/subjects.json`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(receiveBillInfo(billId, bill, json)));
}

const fetchBillInfo = (billId) => (dispatch) => {
    dispatch(requestBillInfo(billId));
    var req = new Request(`https://api.propublica.org/congress/v1/115/bills/${billId}.json`,{
        headers: {
            "X-API-Key": "EmdgdLnrtE2JS1cKFCYdD3Xq9Vl9pmuH5HuWkf0k",
        }
    });
    return fetch(req)
        .then(response => response.json())
        .then(json => dispatch(fetchBillSubjects(billId, json)));
};

const shoudFetchBillInfo = (state, billId) => {
    const bills = state.billInfoById[billId];
    if (!bills) {
        return true;
    }
    if (bills.isFetchingBillInfo) {
        return false;
    }
    else {
        return false;
    }
};


export const fetchBillInfoIfNeeded = (billId) => (dispatch, getState) => {
    if (shoudFetchBillInfo(getState(), billId) && billId !== "") {
        return dispatch(fetchBillInfo(billId));
    }
};

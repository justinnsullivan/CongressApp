import {
    SELECT_BILL_ID,
    REQUEST_BILL_INFO,
    RECEIVE_BILL_INFO,
} from '../actions/billInfo';


export const selectedBillId = (billId = '', action) => {
    switch (action.type) {
        case SELECT_BILL_ID:
            return action.billId;
        default:
            return billId;
    }
};

export const billInfo = (state = {
    isFetchingBillInfo: false,
    bil: {},
}, action) => {
    switch (action.type) {
        case REQUEST_BILL_INFO:
            return {
                ...state,
                isFetchingBillInfo: true,
            };
        case RECEIVE_BILL_INFO:
            return {
                ...state,
                isFetchingBillInfo: false,
                bil: action.billInfo,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

export const billInfoById = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_BILL_INFO:
        case REQUEST_BILL_INFO:
            return {
                ...state,
                [action.billId]: billInfo(state[action.billId], action),
            };
        default:
            return state;
    }
};

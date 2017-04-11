import {
    SELECT_BILL_STATUS,
    REQUEST_RECENT_BILLS,
    RECEIVE_RECENT_BILLS
} from '../actions/bills';


export const selectedBillStatus = (billStatus = 'passed', action) => {
    switch (action.type) {
        case SELECT_BILL_STATUS:
            return action.billStatus;
        default:
            return billStatus;
    }
};

export const recBills = (state = {
    isFetchingBills: false,
    bls: [],
}, action) => {
    switch (action.type) {
        case REQUEST_RECENT_BILLS:
            return {
                ...state,
                isFetchingBills: true,
            };
        case RECEIVE_RECENT_BILLS:
            return {
                ...state,
                isFetchingBills: false,
                bls: action.recBills,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

export const billsByStatus = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RECENT_BILLS:
        case REQUEST_RECENT_BILLS:
            var str = action.billStatus;
            if (action.chamber === 'house') {
                str += "H"
            }
            return {
                ...state,
                [str]: recBills(state[str], action),
            };
        default:
            return state;
    }
};

import {
    REQUEST_LEGISLATOR_INFO,
    RECEIVE_LEGISLATOR_INFO,
    SELECT_LEGISLATOR_ID,
} from '../actions/legislatorInfo';


export const selectedLegislatorId = (id = '', action) => {
    switch (action.type) {
        case SELECT_LEGISLATOR_ID:
            return action.id;
        default:
            return id;
    }
};

export const legislator_info = (state = {
    isFetchingInfo: false,
    info: {},
}, action) => {
    switch (action.type) {
        case REQUEST_LEGISLATOR_INFO:
            return {
                ...state,
                isFetchingInfo: true,
            };
        case RECEIVE_LEGISLATOR_INFO:
            return {
                ...state,
                isFetchingInfo: false,
                info: action.legislator_info,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

export const legislatorInfoById = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LEGISLATOR_INFO:
        case REQUEST_LEGISLATOR_INFO:
            return {
                ...state,
                [action.id]: legislator_info(state[action.id], action),
            };
        default:
            return state;
    }
};

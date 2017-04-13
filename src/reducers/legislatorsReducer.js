import {
    SELECT_DISTRICT,
    SELECT_CHAMBER,
    REQUEST_LEGISLATORS,
    RECEIVE_LEGISLATORS
} from '../actions/legislators';

export const selectedDistrict = (state = 'NY', action) => {
    switch (action.type) {
        case SELECT_DISTRICT:
            return action.district;
        default:
            return state;
    }
};

export const selectedChamber = (state = 'senate', action) => {
    switch (action.type) {
        case SELECT_CHAMBER:
            return action.chamber;
        default:
            return state;
    }
};

export const legislators = (state = {
    isFetching: false,
    items: [],
}, action) => {
    switch (action.type) {
        case REQUEST_LEGISLATORS:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_LEGISLATORS:
            return {
                ...state,
                isFetching: false,
                items: action.legislators,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
};

export const legislatorsByDistrict = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_LEGISLATORS:
        case REQUEST_LEGISLATORS:
            return {
                ...state,
                [action.district]: legislators(state[action.district], action),
            };
        default:
            return state;
    }
};

// const legislatorsReducer = {
//     legislatorsByDistrict: legislatorsByDistrict,
//     legislators: legislators,
//     selectedChamber: selectedChamber
// };

// export default legislatorsReducer;

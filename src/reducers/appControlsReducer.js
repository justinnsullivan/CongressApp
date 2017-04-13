import {
    SELECT_CURRENT_APP,
    SELECT_VOTES_POSITION,
    SELECT_BILLS_POSITION,
    SELECT_LEGISLATORS_POSITION,
    TOGGLE_CONGRESS_MAP
} from '../actions/appControls';
 
export const currentApp = (next = 2, action) => {
    switch (action.type) {
        case SELECT_CURRENT_APP:
            return action.app;
        default:
            return next;
    }
};

export const votesPosition = (pos = 0, action) => {
    switch (action.type) {
        case SELECT_VOTES_POSITION:
            return action.position;
        default:
            return pos;
    }
};

export const billsPosition = (pos = 0, action) => {
    switch (action.type) {
        case SELECT_BILLS_POSITION:
            return action.position;
        default:
            return pos;
    }
};

export const legislatorsPosition = (pos = 0, action) => {
    switch (action.type) {
        case SELECT_LEGISLATORS_POSITION:
            return action.position;
        default:
            return pos;
    }
};

export const congressMapToggle = (toggle = false, action) => {
    switch (action.type) {
        case TOGGLE_CONGRESS_MAP:
            return action.bool;
        default:
            return toggle;
    }
};

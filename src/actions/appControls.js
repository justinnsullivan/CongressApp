export const SELECT_CURRENT_APP = 'SELECT_CURRENT_APP';
export const SELECT_VOTES_POSITION = 'SELECT_VOTES_POSITION';
export const SELECT_BILLS_POSITION = 'SELECT_BILLS_POSITION';
export const SELECT_LEGISLATORS_POSITION = 'SELECT_LEGISLATORS_POSITION';
export const TOGGLE_CONGRESS_MAP = 'TOGGLE_CONGRESS_MAP';

export const selectCurrentApp = app => ({
    type: SELECT_CURRENT_APP,
    app,
});

export const selectVotesPosition = (position) => ({
    type: SELECT_VOTES_POSITION,
    position
});

export const selectBillsPosition = (position) => ({
    type: SELECT_BILLS_POSITION,
    position
});

export const selectLegislatorsPosition = (position) => ({
    type: SELECT_LEGISLATORS_POSITION,
    position
});

export const toggleCongressMap = (bool) => ({
    type: TOGGLE_CONGRESS_MAP,
    bool
});
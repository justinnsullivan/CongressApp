export const REQUEST_LEGISLATORS = 'REQUEST_LEGISLATORS';
export const RECEIVE_LEGISLATORS = 'RECEIVE_LEGISLATORS';
export const SELECT_DISTRICT = 'SELECT_DISTRICT';
export const SELECT_CHAMBER = 'SELECT_CHAMBER';

export const selectDistrict = district => ({
    type: SELECT_DISTRICT,
    district,
});

export const selectChamber = chamber => ({
    type: SELECT_CHAMBER,
    chamber,
});


export const requestLegislators = (district, chamber) => ({
    type: REQUEST_LEGISLATORS,
    district,
    chamber,
});

export const receiveLegislators = (district, chamber, json) => ({
    type: RECEIVE_LEGISLATORS,
    district,
    chamber,
    legislators: json.results,
    receivedAt: Date.now(),
});

const fetchLegislators = (district, chamber) => (dispatch) => {
    dispatch(requestLegislators(district, chamber));
    return fetch(`https://congress.api.sunlightfoundation.com/legislators?in_office=true&chamber=${chamber}&state=${district}`)
        .then(response => response.json())
        .then(json => dispatch(receiveLegislators(district, chamber, json)));
};

const shouldFetchLegislators = (state, district, chamber) => {
    const legislators = state.legislatorsByDistrict[district];
    if (!legislators) {
        return true;
    }
    if (legislators.isFetching) {
        return false;
    }
    return legislators.didInvalidate;
};

export const fetchLegislatorsIfNeeded = (district, chamber) => (dispatch, getState) => {
    if (shouldFetchLegislators(getState(), district, chamber)) {
        return dispatch(fetchLegislators(district, chamber));
    }
};

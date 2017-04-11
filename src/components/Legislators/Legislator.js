import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLegislatordId, fetchLegislatorInfoIfNeeded } from '../../actions/legislatorInfo';


class Legislator extends Component {
    static propTypes = {
        selectedChamber: PropTypes.string.isRequired,
        selectedLegislatorId: PropTypes.string.isRequired,
        legislatorInfo: PropTypes.object.isRequired,
        isFetchingInfo: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch, selectedChamber, selectedLegislatorId } = this.props;
        dispatch(fetchLegislatorInfoIfNeeded(selectedLegislatorId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedLegislatorId !== this.props.selectedLegislatorId) {
            const { dispatch, selectedLegislatorId } = nextProps;
            dispatch(fetchLegislatorInfoIfNeeded(selectedLegislatorId));
        }
    }

    render() {
        const { selectedLegislatorId, legislatorInfo, isFetchingInfo } = this.props;
        var placeholder = <h4>Loading...</h4>
        if (selectedLegislatorId === '') {
            placeholder = <h4>Select a legislator</h4>
        }
        return (
            <div>
                {isFetchingInfo ? placeholder:
                    `${legislatorInfo.basic[0].first_name} ${legislatorInfo.basic[0].last_name} ${legislatorInfo.basic[0].leadership_role}`
                }
                
            </div>
        );
    }
    
};


const mapStateToProps = (state) => {
    const { selectedChamber, selectedLegislatorId, legislatorInfoById } = state;

    const {
        isFetchingInfo,
        info: legislatorInfo,
    } = legislatorInfoById[selectedLegislatorId] || {
        isFetchingInfo: true,
        info: {},
    };
    return {
        selectedChamber,
        selectedLegislatorId,
        legislatorInfo,
        isFetchingInfo
    };
};

export default connect(mapStateToProps)(Legislator);
// class Legislator extends Component {






// }






import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecentVotesIfNeeded, selectNumDays } from '../../actions/votes';
import { fetchVoteTallyIfNeeded, selectRollCall } from '../../actions/voteTally';
import TallyTable from './TallyTable';

class Tally extends Component {
    static propTypes = {
        selectedRollCall: PropTypes.number.isRequired,
        voteTally: PropTypes.object.isRequired,
        isFetchingTally: PropTypes.bool.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {selectedRollCall, dispatch, selectedChamber} = this.props;
        dispatch(fetchVoteTallyIfNeeded(selectedRollCall, selectedChamber));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedRollCall !== this.props.selectedRollCall) {
            const { dispatch, selectedRollCall, selectedChamber} = nextProps;
            dispatch(fetchVoteTallyIfNeeded(selectedRollCall, selectedChamber));
        }
    }

    getChamber = () => this.props.getCurrentChamber()

    render() {
        const { voteTally, isFetchingTally, selectedRollCall } = this.props;
        var placeholder = <h4>Loading Tally...</h4>
        if (selectedRollCall === 0) {
            placeholder = <h4></h4>
        }
        return (
  		    <div>
                {isFetchingTally ? placeholder :
                    <TallyTable tally={voteTally} />
                }
  		    </div>
	    );
  	}
}
const mapStateToProps = (state) => {
    const { tallyByRollCall, selectedRollCall, selectedChamber} = state;
    var num = selectedRollCall;
    if (selectedChamber === 'house'){
        num = num * -1; 
    }
    const {
        isFetchingTally,
        tally: voteTally,
    } = tallyByRollCall[num] || {
        isFetchingTally: true,
        tally: {},
    };
    return {
        selectedRollCall,
        voteTally,
        isFetchingTally,
        selectedChamber
    };
};

export default connect(mapStateToProps)(Tally);

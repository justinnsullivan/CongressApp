import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchVoteTallyIfNeeded, selectRollCall } from '../../actions/voteTally';
import TallyTable from './TallyTable';
import TallyDetails from './TallyDetails';
import TallyNumbers from './TallyNumbers';
import UsTallyMap from '../tools/UsTallyMap';

class Tally extends Component {
    static propTypes = {
        selectedRollCall: PropTypes.number.isRequired,
        voteTally: PropTypes.object.isRequired,
        isFetchingTally: PropTypes.bool.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        let {selectedRollCall, dispatch, selectedChamber} = this.props;
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
        var placeholder = <div className="tally"><i className="loader--tally"></i></div>
        if (selectedRollCall === 0) {
            placeholder = '';
        }
        return (
  		    <div>
                {isFetchingTally ? placeholder :
                    <div className="tally">
                        <TallyDetails vote={voteTally.votes.vote}/>
                        <TallyNumbers vote={voteTally.votes.vote}/>
                        <TallyTable tally={voteTally} />
                        <div className="us-map--tally">
                            <UsTallyMap/>
                            <div className="us-map__key">
                                <span className="us-map__key__yes">Yes</span>
                                <div className="us-map__key__gradient"></div>
                                <span className="us-map__key__no">No</span>
                            </div>
                        </div>
                    </div>
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

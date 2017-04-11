import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecentVotesIfNeeded, selectNumDays } from '../actions/votes';
import { fetchVoteTallyIfNeeded, selectRollCall } from '../actions/voteTally';
import Tally from '../components/Votes/Tally';

class Votes extends Component {
    static propTypes = {
        selectedDayNum: PropTypes.number.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        recVotes: PropTypes.object.isRequired,
        isFetchingVotes: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch, selectedDayNum, selectedChamber} = this.props;
        dispatch(fetchRecentVotesIfNeeded(selectedDayNum, selectedChamber));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDayNum !== this.props.selectedDayNum) {
            const { dispatch, selectedDayNum, selectedChamber} = nextProps;
            dispatch(fetchRecentVotesIfNeeded(selectedDayNum, selectedChamber));
        }
    }

    handleChange = (voteDates) => {
        this.props.dispatch(selectNumDays(voteDates));
    };

    getVoteTally = (rollCall) => {
        console.log(rollCall);
        this.props.dispatch(selectRollCall(parseInt(rollCall)));
    }

    getChamber = () => this.props.getCurrentChamber()

    render() {
        const { recVotes, isFetchingVotes } = this.props;
        return (
  		    <div>
                <Tally getCurrentChamber={this.getChamber}/>
                {isFetchingVotes ? <h2>Loading Votes...</h2> :
                    recVotes['votes'].map((vote, i) =>
                        <li key={i} onClick={this.getVoteTally.bind(this, vote.roll_call)}>
                            {vote.description}
                        </li>,
                    )
                }
  		    </div>
	    );
  	}
}
const mapStateToProps = (state) => {
    const { selectedDayNum, votesByDayNum, selectedChamber} = state;
    var num = selectedDayNum;
    if (selectedChamber === 'house'){
        num += 100; 
    }
    const {
        isFetchingVotes,
        vts: recVotes,
    } = votesByDayNum[num] || {
        isFetchingVotes: true,
        vts: {},
    };

    return {
        selectedDayNum,
        recVotes,
        isFetchingVotes,
        selectedChamber
    };
};

export default connect(mapStateToProps)(Votes);

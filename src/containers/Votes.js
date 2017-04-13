import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectVotesPosition } from '../actions/appControls';
import { fetchRecentVotesIfNeeded, selectDate } from '../actions/votes';
import { fetchVoteTallyIfNeeded, selectRollCall } from '../actions/voteTally';
import Tally from '../components/Votes/Tally';

class Votes extends Component {
    static propTypes = {
        votesPosition: PropTypes.number.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        selectedRollCall: PropTypes.number.isRequired,
        recVotes: PropTypes.array.isRequired,
        isFetchingVotes: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch, selectedDate, selectedRollCall, selectedChamber, recVotes} = this.props;
        dispatch(fetchRecentVotesIfNeeded(selectedDate, recVotes, selectedChamber));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDate !== this.props.selectedDate) {
            const { dispatch, selectedDate, selectedChamber, recVotes} = nextProps;
            dispatch(fetchRecentVotesIfNeeded(selectedDate, recVotes, selectedChamber));
        }
        if (nextProps.votesPosition !== this.props.votesPosition) {
            const { dispatch, selectedRollCall, selectedChamber} = nextProps;
            dispatch(fetchVoteTallyIfNeeded(selectedRollCall, selectedChamber));
        }
    }

    handleChange = (voteDates) => {
        this.props.dispatch(selectDate(voteDates));
    };

    getVoteTally = (rollCall) => {
        this.props.dispatch(selectRollCall(parseInt(rollCall)));
    }

    incrementVote = () => {
        const {dispatch, votesPosition, recVotes, selectedChamber} = this.props;
        let selectedDate = this.props.selectedDate;
        const length = recVotes.length;
        if ((length) === votesPosition + 1) {
            if (selectedDate.getMonth() === 1){
                dispatch(selectVotesPosition(0));
                dispatch(selectRollCall(parseInt(recVotes[0].roll_call)));
            }
            else {
                selectedDate.setDate(selectedDate.getDate() -31);
                dispatch(fetchRecentVotesIfNeeded(selectedDate, recVotes, selectedChamber));
            }
        }
        else {
            dispatch(selectVotesPosition(votesPosition + 1));
            dispatch(selectRollCall(parseInt(recVotes[votesPosition + 1].roll_call)));
        }
    }

    decrementVote = () => {
        const {dispatch, votesPosition, recVotes} = this.props;
        const length = recVotes.length;
        if (0 === votesPosition) {
            dispatch(selectVotesPosition(length - 1));
            dispatch(selectRollCall(parseInt(recVotes[0].roll_call)));
        }
        else {
            dispatch(selectVotesPosition(votesPosition - 1));
            dispatch(selectRollCall(parseInt(recVotes[votesPosition - 1].roll_call)));
        }
    }

    getChamber = () => this.props.getCurrentChamber()

    render() {
        const { recVotes, isFetchingVotes,  votesPosition} = this.props;

        var givenRoll = 0;
        return (
            <div>
      		    <div className="votes">
                    <div className="votes__arrow--left">
                        <i onClick={this.decrementVote.bind(this)}></i>
                    </div>
                    
                        {isFetchingVotes ? <div className="votes__current-brief"><h2>Loading Votes...</h2></div>:
                            <div className="votes__current-brief">
                                <p className="title--vote" onClick={this.getVoteTally.bind(this, recVotes[votesPosition].roll_call)}>
                                    {recVotes[votesPosition].question}
                                </p>
                                <p className="title--sub1--vote">
                                    {recVotes[votesPosition].description}
                                </p>
                                <p className="title--sub2--vote">
                                    {recVotes[votesPosition].result} - {recVotes[votesPosition].date} - {recVotes[votesPosition].time}
                                </p>
                                <p className="title--sub3--vote">
                                    <span className="yes"> {recVotes[votesPosition].total.yes} </span> - <span className="no"> {recVotes[votesPosition].total.no} </span>
                                </p>
                            </div>
                        }
                    
                    <div className="votes__arrow--right">
                        <i onClick={this.incrementVote.bind(this)}></i>
                    </div>
      		    </div>
                <Tally givenRoll={givenRoll} getCurrentChamber={this.getChamber}/>
            </div>
	    );
  	}
}
const mapStateToProps = (state) => {
    const { selectedDate, votesByChamber, selectedRollCall, selectedChamber, votesPosition} = state;
    const {
        isFetchingVotes,
        vts: recVotes,
    } = votesByChamber[selectedChamber] || {
        isFetchingVotes: true,
        vts: [],
    };

    return {
        selectedDate,
        recVotes,
        isFetchingVotes,
        selectedChamber,
        selectedRollCall,
        votesPosition
    };
};

export default connect(mapStateToProps)(Votes);

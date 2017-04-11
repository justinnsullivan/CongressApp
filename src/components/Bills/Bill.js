import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBillId, fetchBillInfoIfNeeded } from '../../actions/billInfo';
import { fetchVoteTallyIfNeeded, selectRollCall } from '../../actions/voteTally';


class Bill extends Component {
    static propTypes = {
        selectedChamber: PropTypes.string.isRequired,
        selectedBillId: PropTypes.string.isRequired,
        billInfo: PropTypes.array.isRequired,
        isFetchingBillInfo: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch, selectedChamber, selectedBillId } = this.props;
        dispatch(fetchBillInfoIfNeeded(selectedBillId));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedBillId !== this.props.selectedBillId) {
            const { dispatch, selectedBillId } = nextProps;
            dispatch(fetchBillInfoIfNeeded(selectedBillId));
        }
    }

    alterRollCall = (newRollCall, chamber) => {
        this.props.dispatch(fetchVoteTallyIfNeeded(newRollCall, chamber.toLowerCase()));
    }
    render(){
        const { selectedBillId, billInfo, isFetchingBillInfo } = this.props;
        var placeholder = <h4>Loading...</h4>;
        var extra = <p>No Votes</p>;
        if (billInfo[0] && billInfo[0].votes.length !== 0){
            extra = <button onClick={this.alterRollCall.bind(this, billInfo[0].votes[0].roll_call, billInfo[0].votes[0].chamber)}>
                        See Final Vote
                    </button>
        }
        if (selectedBillId === '') {
            placeholder = <h4>Select a Bill</h4>
        }

        return (
            <div>
                {isFetchingBillInfo ? placeholder:
                    <div>
                        <p>{billInfo[0].title} {billInfo[0].number} </p>
                        {extra}
                    </div>
                }
            </div>
        );
    }
    
};

// export default Bill;


const mapStateToProps = (state) => {
    const { selectedChamber, selectedBillId, billInfoById } = state;

    const {
        isFetchingBillInfo,
        bil: billInfo,
    } = billInfoById[selectedBillId] || {
        isFetchingBillInfo: true,
        bil: [],
    };
    return {
        selectedChamber,
        selectedBillId,
        billInfo,
        isFetchingBillInfo
    };
};

export default connect(mapStateToProps)(Bill);




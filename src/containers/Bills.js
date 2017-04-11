import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRecentBillsIfNeeded, selectBillStatus } from '../actions/bills';
import { selectBillId } from '../actions/billInfo';
import Bill from '../components/Bills/Bill';

class Bills extends Component {
    static propTypes = {
        selectedBillStatus: PropTypes.string.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        recBills: PropTypes.array.isRequired,
        isFetchingBills: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch, selectedBillStatus, selectedChamber} = this.props;
        dispatch(fetchRecentBillsIfNeeded(selectedBillStatus, selectedChamber));
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.selectedBillStatus !== this.props.selectedBillStatus) ||
            (nextProps.selectedChamber !== this.props.selectedChamber)) {
            const { dispatch, selectedBillStatus, selectedChamber} = nextProps;
            dispatch(fetchRecentBillsIfNeeded(selectedBillStatus, selectedChamber));
        }
    }

    getBillInfo = (newBillId) => {
        this.props.dispatch(selectBillId(newBillId));
    }

    alterBillStatus = (newBillStatus) => {
        this.props.dispatch(selectBillStatus(newBillStatus));
    };

    render() {
        const { recBills, isFetchingBills } = this.props;
        return (
  		    <div>
                <Bill/>
                <h4>Bills</h4>
                {isFetchingBills ? <h4>Loading Bills...</h4> :
                    recBills[0]['bills'].map((bill, i) =>
                        <li key={i} onClick={this.getBillInfo.bind(this, bill.bill_id.replace('-115',''))}>
                            {bill.title}
                        </li>
                    )
                }
  		    </div>
	    );
  	}
}
const mapStateToProps = (state) => {
    const { selectedBillStatus, billsByStatus, selectedChamber} = state;
    var status = selectedBillStatus;
    if (selectedChamber === 'house'){
        status += 'H'; 
    }
    const {
        isFetchingBills,
        bls: recBills,
    } = billsByStatus[status] || {
        isFetchingBills: true,
        bls: [],
    };

    return {
        selectedBillStatus,
        recBills,
        isFetchingBills,
        selectedChamber
    };
};

export default connect(mapStateToProps)(Bills);

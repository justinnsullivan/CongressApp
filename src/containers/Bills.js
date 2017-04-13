import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBillsPosition } from '../actions/appControls';
import { fetchRecentBillsIfNeeded, selectBillStatus } from '../actions/bills';
import { selectBillId } from '../actions/billInfo';
import Bill from '../components/Bills/Bill';

class Bills extends Component {
    static propTypes = {
        selectedBillStatus: PropTypes.string.isRequired,
        billsPosition: PropTypes.number.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        recBills: PropTypes.array.isRequired,
        isFetchingBills: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { dispatch, selectedBillStatus, selectedChamber} = this.props;
        dispatch(fetchRecentBillsIfNeeded(selectedBillStatus, selectedChamber));
    };

    componentWillReceiveProps(nextProps) {
        if ((nextProps.selectedBillStatus !== this.props.selectedBillStatus) ||
            (nextProps.selectedChamber !== this.props.selectedChamber)) {
            const { dispatch, selectedBillStatus, selectedChamber} = nextProps;
            dispatch(fetchRecentBillsIfNeeded(selectedBillStatus, selectedChamber));
        }
    };

    incrementBill = () => {
        const {dispatch, billsPosition, recBills} = this.props;
        const length = recBills[0]['bills'].length;
        if ((length) === billsPosition + 1) {
            dispatch(selectBillsPosition(0));
            dispatch(selectBillId(recBills[0]['bills'][0].bill_id.replace('-115','')));
        }
        else {
            dispatch(selectBillsPosition(billsPosition + 1));
            dispatch(selectBillId(recBills[0]['bills'][billsPosition + 1].bill_id.replace('-115','')));
        }
    };

    decrementBill = () => {
        const {dispatch, billsPosition, recBills} = this.props;
        const length = recBills[0]['bills'].length;
        if (0 === billsPosition) {
            dispatch(selectBillsPosition(length - 1));
            dispatch(selectBillId(recBills[0]['bills'][length - 1].bill_id.replace('-115','')));
        }
        else {
            dispatch(selectBillsPosition(billsPosition - 1));
            dispatch(selectBillId(recBills[0]['bills'][billsPosition - 1].bill_id.replace('-115','')));
        }
    }

    getBillInfo = (newBillId) => {
        this.props.dispatch(selectBillId(newBillId));
    }

    alterBillStatus = (newBillStatus) => {
        this.props.dispatch(selectBillStatus(newBillStatus));
    };

    render() {
        const { recBills, isFetchingBills, billsPosition } = this.props;
        const placeholder = <div className="bills__current-brief"><i className="loader--bills"></i></div>
        return (
            <div>
    		    <div className="bills">
                    <div className="votes__arrow--left">
                        <i onClick={this.decrementBill.bind(this)}></i>
                    </div>
                    {isFetchingBills ? placeholder :
                        <div className="bills__current-brief">
                            <p className="title--bills" onClick={this.getBillInfo.bind(this, recBills[0]['bills'][billsPosition].bill_id.replace('-115',''))}>
                                {recBills[0]['bills'][billsPosition].number}
                            </p>
                            <p className="title--sub1--bills">
                                {recBills[0]['bills'][billsPosition].title}
                            </p>
                            <p className="title--sub2--bills">
                                {recBills[0]['bills'][billsPosition].primary_subject} - {recBills[0]['bills'][billsPosition].committees}
                            </p>
                            <p className="title--sub2--bills">
                                {recBills[0]['bills'][billsPosition].latest_major_action}
                            </p>
                            <p className="title--sub3--bills">
                                Introduced on {recBills[0]['bills'][billsPosition].introduced_date} 
                            </p>
                        </div>
                    }
                    <div className="votes__arrow--right">
                        <i onClick={this.incrementBill.bind(this)}></i>
                    </div>
    		    </div>
                <Bill/>
            </div>
	    );
  	}
}
const mapStateToProps = (state) => {
    const { selectedBillStatus, billsPosition, billsByStatus, selectedChamber} = state;
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
        billsPosition,
        isFetchingBills,
        selectedChamber
    };
};

export default connect(mapStateToProps)(Bills);

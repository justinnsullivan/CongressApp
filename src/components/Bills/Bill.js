import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBillId, fetchBillInfoIfNeeded } from '../../actions/billInfo';
import { fetchVoteTallyIfNeeded, selectRollCall } from '../../actions/voteTally';
import BillInfo from './BillInfo';


class Bill extends Component {
    static propTypes = {
        selectedChamber: PropTypes.string.isRequired,
        selectedBillId: PropTypes.string.isRequired,
        billInfo: PropTypes.object.isRequired,
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

    render(){
        const { selectedBillId, billInfo, isFetchingBillInfo } = this.props;
        var placeholder = <i className="loader--tally"></i>;
        if (selectedBillId === '') {
            placeholder = '';
        }
        return (
            <div className='bill-info'>
                {isFetchingBillInfo ? placeholder :
                    <BillInfo billInfo={billInfo}/>
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
        bil: {},
    };
    return {
        selectedChamber,
        selectedBillId,
        billInfo,
        isFetchingBillInfo
    };
};

export default connect(mapStateToProps)(Bill);




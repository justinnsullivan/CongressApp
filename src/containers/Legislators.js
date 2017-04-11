import React, { Component } from 'react';
import s from '../scss/app.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectDistrict, selectChamber, fetchLegislatorsIfNeeded } from '../actions/legislators';
import { selectLegislatordId } from '../actions/legislatorInfo';
import Senators from '../components/Legislators/Senators';
import Reps from '../components/Legislators/Reps';
import Legislator from '../components/Legislators/Legislator';
const isProduction = process.env.NODE_ENV === 'production';


class Legislators extends Component {
    static propTypes = {
        selectedDistrict: PropTypes.string.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        legislators: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { dispatch, selectedDistrict, selectedChamber } = this.props;
        dispatch(fetchLegislatorsIfNeeded(selectedDistrict, selectedChamber));
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.selectedDistrict !== this.props.selectedDistrict) ||
            (nextProps.selectedChamber !== this.props.selectedChamber)) {
            const { dispatch, selectedDistrict, selectedChamber } = nextProps;
            dispatch(fetchLegislatorsIfNeeded(selectedDistrict, selectedChamber));
        }
    }

    getLegislator = (nextLegislator) => {
        this.props.dispatch(selectLegislatordId(nextLegislator));
    };

    render() {
        const { selectedChamber, legislators, isFetching} = this.props;
        return (
            <div>
                { isFetching ? <h2>Loading...</h2> :
                    selectedChamber === 'senate' ?
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Senators onClick={this.getLegislator} senators={legislators} />
                        </div> :
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Reps onClick={this.getLegislator} reps={legislators} />
                        </div>
                }
                <Legislator/>
            </div>
    	);
  	}
}

const mapStateToProps = (state) => {
    const { selectedDistrict, selectedChamber, legislatorsByDistrict} = state;
    const {
        isFetching,
        items: legislators,
    } = legislatorsByDistrict[selectedDistrict] || {
        isFetching: true,
        items: [],
    };

    return {
        selectedDistrict,
        selectedChamber,
        legislators,
        isFetching
    };
};


export default connect(mapStateToProps)(Legislators);


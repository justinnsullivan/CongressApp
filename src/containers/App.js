import React, { Component } from 'react';
import s from '../scss/app.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectDistrict, selectChamber, fetchLegislatorsIfNeeded } from '../actions/legislators';
import { selectLegislatordId, fetchLegislatorInfoIfNeeded } from '../actions/legislatorInfo';
import { fetchRecentVotesIfNeeded } from '../actions/votes';
import Picker from '../components/Tools/Picker';
import Senators from '../components/Legislators/Senators';
import Reps from '../components/Legislators/Reps';
import Votes from './Votes';
import Bills from './Bills';
import Legislators from './Legislators';
import DevTools from '../components/Tools/DevTools';
import UsMap from '../components/Tools/Map';

const isProduction = process.env.NODE_ENV === 'production';

class App extends Component {
    static propTypes = {
        selectedChamber: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    alterChamber = (newChamber) => {
        this.props.dispatch(selectChamber(newChamber));
        this.props.dispatch(fetchRecentVotesIfNeeded(20, newChamber, true));
    };

    render() {
        const { selectedChamber} = this.props;
        return (
            <div className="app">
                <div className="map column small-12 large-12 columns">
                    <Picker
                        value={selectedChamber}
                        onChange={this.alterChamber}
                        options={['senate', 'house']}
                    />
                    <UsMap/>
                </div>
                <Legislators/>
                <Votes/>
            </div>
    	);
  	}
}

const mapStateToProps = (state) => {
    const { selectedChamber} = state;
    return {
        selectedChamber
    };
};


export default connect(mapStateToProps)(App);


import React, { Component } from 'react';
import s from '../scss/app.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectCurrentApp, selectVotesPosition, selectBillsPosition} from '../actions/appControls';
import { fetchRecentVotesIfNeeded} from '../actions/votes';
import Picker from '../components/Tools/Picker';
import Votes from './Votes';
import Bills from './Bills';
import { selectChamber } from '../actions/legislators';
import Legislators from './Legislators';
import DevTools from '../components/Tools/DevTools';

// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true;


class App extends Component {
    static propTypes = {
        selectedChamber: PropTypes.string.isRequired,
        recVotes: PropTypes.array.isRequired,
        currentApp: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    alterChamber = (newChamber) => {
        const {dispatch, selectedDate, recVotes} = this.props;
        dispatch(selectChamber(newChamber));
        dispatch(selectVotesPosition(0));
        dispatch(selectBillsPosition(0));
        dispatch(fetchRecentVotesIfNeeded(selectedDate, recVotes, newChamber, true));
    };

    switchApp = (newApp) => {
        if (newApp!== this.props.currentApp) {
            this.props.dispatch(selectCurrentApp(newApp));
        }
    }

    render() {
        const { selectedChamber,currentApp} = this.props;
        let classes = ["","",""];
        const poss = {1:<Votes/>,2:<Legislators/>,3:<Bills/>};
        const currApp = poss[currentApp];
        classes[currentApp - 1] = "active";
        return (
            <div className="app">
                <div className="main">
                    <div className="main__selector">
                        <div className={`main__selector--votes + ${classes[0]}`} onClick={this.switchApp.bind(this,1)}>
                            <i className="main__selector__icon--votes"  aria-hidden="true"></i>
                            Votes
                        </div>
                        <div className={`main__selector--votes + ${classes[1]}`} onClick={this.switchApp.bind(this,2)}>
                            <i className="main__selector__icon--legislators" aria-hidden="true"></i>
                            Legislators
                        </div>
                        <div className={`main__selector--votes + ${classes[2]}`} onClick={this.switchApp.bind(this,3)}>
                            <i className="main__selector__icon--bills" aria-hidden="true"></i>
                            Bills
                        </div>
                    </div>
                    {currApp}
                </div>
                <DevTools/>
            </div>
    	);
  	}
}

const mapStateToProps = (state) => {
    const { selectedChamber, selectedDate, currentApp, votesByChamber} = state;
    const {
        vts: recVotes,
    } = votesByChamber[selectedChamber] || {
        vts: [],
    };
    return {
        selectedChamber,
        selectedDate,
        recVotes,
        currentApp
    };
};


export default connect(mapStateToProps)(App);

// <Picker
//     value={selectedChamber}
//     onChange={this.alterChamber}
//     options={['senate', 'house']}
// />

import React, { Component } from 'react';
import s from '../../scss/app.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DevTools from './DevTools';

const isProduction = process.env.NODE_ENV === 'production';

class Header extends Component {
    static propTypes = {
        selectedChamber: PropTypes.string.isRequired,
        currentApp: PropTypes.number.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    alterChamber = (newChamber) => {
        this.props.dispatch(selectChamber(newChamber));
        this.props.dispatch(fetchRecentVotesIfNeeded(20, newChamber, true));
    };

    render() {
        const { selectedChamber} = this.props;
        return (
            <div className="app">
                <div className="main">
                    <div className="main__selector">
                        <div className="main__selector--votes">
                            <i className="main__selector__icon--votes" aria-hidden="true"></i>
                            Votes
                        </div>
                        <div className="main__selector--legislators">
                            <i className="main__selector__icon--legislators" aria-hidden="true"></i>
                            Legislators
                        </div>
                        <div className="main__selector--bills">
                            <i className="main__selector__icon--bills" aria-hidden="true"></i>
                            Bills
                        </div>
                    </div>
                </div>
            </div>
    	);
  	}
}

// <div className="us-map">
//     <Picker
//         value={selectedChamber}
//         onChange={this.alterChamber}
//         options={['senate', 'house']}
//     />
//     <UsMap/>
// </div>
// <DevTools/>

const mapStateToProps = (state) => {
    const { selectedChamber, currentApp} = state;
    return {
        selectedChamber,
        currentApp
    };
};


export default connect(mapStateToProps)(Header);

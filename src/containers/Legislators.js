import React, { Component } from 'react';
import s from '../scss/app.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLegislatorsPosition, toggleCongressMap} from '../actions/appControls';
import { selectDistrict, selectChamber, fetchLegislatorsIfNeeded } from '../actions/legislators';
import { selectLegislatordId } from '../actions/legislatorInfo';
import Legislator from '../components/Legislators/Legislator';
import UsCongressMap from '../components/tools/UsCongressMap';
const isProduction = process.env.NODE_ENV === 'production';

const districts = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE',
    'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY',
    'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC',
    'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR',
    'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VI', 'VT', 'WA',
    'WI', 'WV', 'WY'
];

const photos = {
    "H001076": "http://vote-usa.org/Image.aspx?Id=NHShaheenJeanne",
    "W000817": "http://vote-usa.org/Image.aspx?Id=MAWarrenElizabethA",
    "G000562": "http://vote-usa.org/Image.aspx?Id=NJBookerCory",
    "C001070": "http://vote-usa.org/Image.aspx?Id=PACaseyBobJR",
    "C001088": "http://vote-usa.org/Image.aspx?Id=DECoonsChristopherA",
    "V000128": "http://vote-usa.org/Image.aspx?Id=MDVanhollenChris",
    "C001047": "http://vote-usa.org/Image.aspx?Id=WVCapitoShelleyMoore",
    "M001183": "http://vote-usa.org/Image.aspx?Id=WVManchinJoeIii&Col=Headshot100&Def=Headshot100",
    "K000384": "http://vote-usa.org/Image.aspx?Id=VAKaineTimothyM&Col=Headshot100&Def=Headshot100",
    "B001135": "http://vote-usa.org/Image.aspx?Id=NCBurrRichard&Col=Headshot100&Def=Headshot100",
    "P000612": "http://vote-usa.org/Image.aspx?Id=GAPerdueDavidAlfred&Col=Headshot100&Def=Headshot100",
    "I000055": "http://vote-usa.org/Image.aspx?Id=GAIsaksonJohnny&Col=Headshot100&Def=Headshot100",
    "B000944": "http://vote-usa.org/Image.aspx?Id=OHBrownSherrodCampbell&Col=Headshot100&Def=Headshot100",
    "P000449": "http://vote-usa.org/Image.aspx?Id=OHPortmanRob&Col=Headshot100&Def=Headshot100",
    "Y000064": "http://vote-usa.org/Image.aspx?Id=INYoungTodd&Col=Headshot100&Def=Headshot100",
    "P000595": "http://vote-usa.org/Image.aspx?Id=MIPetersGary&Col=Headshot100&Def=Headshot100",
    "S000770": "http://vote-usa.org/Image.aspx?Id=MIStabenowDebbie&Col=Headshot100&Def=Headshot100",
    "D000622": "http://vote-usa.org/Image.aspx?Id=ILDuckworthLTammy&Col=Headshot100&Def=Headshot100",
    "K000393": "http://vote-usa.org/Image.aspx?Id=LAKennedyJohn&Col=Headshot100&Def=Headshot100",
    "C001095": "http://vote-usa.org/Image.aspx?Id=ARCottonThomasB&Col=Headshot100&Def=Headshot100",
    "F000457": "http://vote-usa.org/Image.aspx?Id=MNFrankenAl&Col=Headshot100&Def=Headshot100",
    "K000367": "http://vote-usa.org/Image.aspx?Id=MNKlobucharAmy&Col=Headshot100&Def=Headshot100",
    "G000386": "http://vote-usa.org/Image.aspx?Id=IAGrassleyChuckE&Col=Headshot100&Def=Headshot100",
    "I000024": "http://vote-usa.org/Image.aspx?Id=OKInhofeJimM&Col=Headshot100&Def=Headshot100",
    "S001197": "http://vote-usa.org/Image.aspx?Id=NESasseBen&Col=Headshot100&Def=Headshot100",
    "T000250": "http://vote-usa.org/Image.aspx?Id=SDThuneJohnR&Col=Headshot100&Def=Headshot100",
    "B001261": "http://vote-usa.org/Image.aspx?Id=WYBarrassoJohn&Col=Headshot100&Def=Headshot100",
    "H001046": "http://vote-usa.org/Image.aspx?Id=NMHeinrichMartinT&Col=Headshot100&Def=Headshot100",
    "U000039": "http://vote-usa.org/Image.aspx?Id=NMUdallTom&Col=Headshot100&Def=Headshot100",
    "M000303": "http://vote-usa.org/Image.aspx?Id=AZMccainJohn&Col=Headshot100&Def=Headshot100",
    "R000584": "http://vote-usa.org/Image.aspx?Id=IDRischJamesE&Col=Headshot100&Def=Headshot100",
    "C001113": "http://vote-usa.org/Image.aspx?Id=NVCortezmastoCatherine&Col=Headshot100&Def=Headshot100",
    "H001075": "http://vote-usa.org/Image.aspx?Id=CAHarrisKamalaD&Col=Headshot100&Def=Headshot100",
    "M001153": "http://vote-usa.org/Image.aspx?Id=AKMurkowskiLisa&Col=Headshot100&Def=Headshot100",
    "S001194": "http://vote-usa.org/Image.aspx?Id=HISchatzBrian&Col=Headshot100&Def=Headshot100"
}

class Legislators extends Component {
    static propTypes = {
        selectedDistrict: PropTypes.string.isRequired,
        selectedChamber: PropTypes.string.isRequired,
        congressMapToggle: PropTypes.bool.isRequired,
        legislatorsPosition: PropTypes.number.isRequired,
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

    getLegislators = (nextDistrict) => {
        const {dispatch} = this.props;
        dispatch(selectDistrict(nextDistrict));
    };

    incrementLegislator = () => {
        const {dispatch, legislatorsPosition, legislators} = this.props;
        const length = legislators.length;
        if ((length) === legislatorsPosition + 1) {
            dispatch(selectLegislatorsPosition(0));
            dispatch(selectLegislatordId(legislators[0].bioguide_id));
        }
        else {
            dispatch(selectLegislatorsPosition(legislatorsPosition + 1));
            dispatch(selectLegislatordId(legislators[legislatorsPosition + 1].bioguide_id));
        }
    };

    toggleCongressMap = () => {
        const {dispatch, congressMapToggle} = this.props;
        dispatch(toggleCongressMap(!congressMapToggle))
    };

    decrementLegislator = () => {
        const {dispatch, legislatorsPosition, legislators} = this.props;
        const length = legislators.length;
        if (0 === legislatorsPosition) {
            dispatch(selectLegislatorsPosition(length - 1));
            dispatch(selectLegislatordId(legislators[length - 1].bioguide_id));
        }
        else {
            dispatch(selectLegislatorsPosition(legislatorsPosition - 1));
            dispatch(selectLegislatordId(legislators[legislatorsPosition - 1].bioguide_id));
        }

    }

    render() {
        const { selectedChamber, legislators, isFetching, legislatorsPosition, congressMapToggle} = this.props;
        const parties = {D:"Democrat", R:"Republican", I:"Independent"};
        let photo = "";
        if (legislators.length > 0){
            if (photos[legislators[legislatorsPosition].bioguide_id]) {
                photo = photos[legislators[legislatorsPosition].bioguide_id];
            }
            else {
                photo = legislators[legislatorsPosition].middle_name !== null ? 
                "http://vote-usa.org/Image.aspx?Id=" + legislators[legislatorsPosition].state+legislators[legislatorsPosition].last_name+legislators[legislatorsPosition].first_name+legislators[legislatorsPosition].middle_name.substring(0,1) :
                "http://vote-usa.org/Image.aspx?Id=" + legislators[legislatorsPosition].state+legislators[legislatorsPosition].last_name+legislators[legislatorsPosition].first_name;
            }
        }
        return (
            <div>
                <div className="legislators">
                    <div className="legislators__arrow--left">
                        <i onClick={this.decrementLegislator.bind(this)}></i>
                    </div>
                    {isFetching ? <div className="legislators__current-brief"><i className="loader--bills"></i></div> :
                        <div className="legislators__current-brief">
                            {selectedChamber === 'senate' ? 
                                <img onClick={this.getLegislator.bind(this, legislators[legislatorsPosition].bioguide_id)} className="legislators__photo" alt={`${legislators[legislatorsPosition].last_name}`} src={photo} /> :
                                ""
                            }
                            <div className={`title--legislators--${legislators[legislatorsPosition].party}`}>
                                {legislators[legislatorsPosition].first_name} {legislators[legislatorsPosition].last_name}
                            </div>
                            <p className={`title--sub1--legislators--${legislators[legislatorsPosition].party}`}>
                                {parties[legislators[legislatorsPosition].party]} - {legislators[legislatorsPosition].state_name}
                            </p>
                            {!legislators[legislatorsPosition].leadership_role ? '' :
                                <p className={`title--sub2--legislators--${legislators[legislatorsPosition].party}`}>
                                    {legislators[legislatorsPosition].leadership_role}
                                </p>
                            }
                        </div>
                    }
                    <div className="legislators__arrow--right">
                        <i onClick={this.incrementLegislator.bind(this)}></i>
                    </div>
                </div>
                <div className="legislators__toggle" onClick={this.toggleCongressMap.bind(this)}>
                    {!congressMapToggle ? 'Choose Legislator' : 'Hide Map'}
                </div>
                {!congressMapToggle ? '' :
                    <div className="us-map--congress">
                        <UsCongressMap onClick={this.getLegislators}/>
                    </div>
                }
                <Legislator/>
            </div>
    	);
  	}
}

const mapStateToProps = (state) => {
    const { selectedDistrict, selectedChamber, legislatorsByDistrict, congressMapToggle, legislatorsPosition} = state;
    const {
        isFetching,
        items: legislators,
    } = legislatorsByDistrict[selectedDistrict] || {
        isFetching: true,
        items: [],
    };

    return {
        legislatorsPosition,
        congressMapToggle,
        selectedDistrict,
        selectedChamber,
        legislators,
        isFetching
    };
};


export default connect(mapStateToProps)(Legislators);


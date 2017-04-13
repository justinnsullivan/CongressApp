import React from 'react';
import PropTypes from 'prop-types';
import LegislatorBillsTable from './LegislatorBillsTable'

const states = {
    "AL": "Alabama", "AK": "Alaska", "AS": "American Samoa", "AZ": "Arizona", "AR": "Arkansas", "CA": "California",
    "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware","FL": "Florida", "GA": "Georgia", "HI": "Hawaii", 
    "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana",
    "ME": "Maine", "MH": "Marshall Islands", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota",
    "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", 
    "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota",
    "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PW": "Palau", "PA": "Pennsylvania", "RI": "Rhode Island",
    "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont",
    "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming"
}

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const formatDate = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const arr = date.split('-');
    let day = months[parseInt(arr[1].replace(/^0+/, '')) - 1] + ' ' + parseInt(arr[2].replace(/^0+/, '')) + ', ' + arr[0];
    return day;
}

const LegislatorInfo = ({ legislatorInfo }) => {
    var basic,bills,billsArr = [];
    var here = false;
    if (legislatorInfo.basic && legislatorInfo.bills) {
        here = true;
        basic = legislatorInfo.basic[0];
        bills = legislatorInfo.bills;
        billsArr = []
        for (var i = bills.length - 1; i >= 0; i--) {
            let temp = {};
            temp.Number = bills[i].bill_type.toUpperCase() + bills[i].number;
            temp.Title = bills[i].official_title;
            temp.Congress = bills[i].congress;
            temp.Introduced = bills[i].introduced_on;
            temp.Active = (bills[i].history.active === true) ? "Yes" : "No";
            billsArr.push(temp);
        }
    }
    return(
        <div>
            <div className="legislator-info__details">
                <div className="legislator-info__title">
                    <div>
                        <p className={`title--legislator-info--${basic.current_party}`}>
                            {basic.first_name} {basic.last_name}
                        </p>
                    </div>
                </div>
                <div className="legislator-info__small">
                    <div className={`title--sub2--legislator-info--${basic.current_party}`}>
                        Title 
                    </div>
                    <div className={`title--sub1--legislator-info--${basic.current_party}`}>
                        {basic.roles[0].title}
                    </div>
                    <div className={`title--sub2--legislator-info--${basic.current_party}`}>
                        State 
                    </div>
                    <div className={`title--sub1--legislator-info--${basic.current_party}`}>
                        {states[basic.roles[0].state]}
                    </div>
                </div>
                <div className="legislator-info__words">
                    <div className={`title--sub2--legislator-info--${basic.current_party}`}>
                        Rank 
                    </div>
                    <div className={`title--sub1--legislator-info--${basic.current_party}`}>
                        {toTitleCase(basic.roles[0].state_rank)}
                    </div>
                    <div className={`title--sub2--legislator-info--${basic.current_party}`}>
                        Current Term 
                    </div>
                    <div className={`title--sub1--legislator-info--${basic.current_party}`}>
                        {formatDate(basic.roles[0].start_date)} - {formatDate(basic.roles[0].end_date)}
                    </div>
                </div>
            </div>
            <div className="legislator-info__table">
                <p className={`title--sub1--legislator-info--${basic.current_party}`}>
                    BILLS
                </p>
                <LegislatorBillsTable bills={billsArr} party={basic.current_party}/>
            </div>
            <div className="legislator-info__table">
                <p className={`title--sub1--legislator-info--${basic.current_party}`}>
                    COMMITTEES
                </p>
                <div className={`legislator-info__committees--${basic.current_party}`}>
                    {basic.roles[0].committees.map((committee, i) =>
                        <span key={i}> {committee.name} | </span> 
                    )}
                </div>
            </div>
            <div className="legislator-info__links">
                <a className={`link--social--${basic.current_party}`} target="_blank" href={`https://www.facebook.com/`+basic.facebook_account}>
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
                <a className={`link--social--${basic.current_party}`} target="_blank" href={`https://www.twitter.com/`+basic.twitter_account}>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
                <a className={`link--social--${basic.current_party}`} target="_blank" href={`tel:`+basic.roles[0].phone.replace("-","")}>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                </a>
                <a className={`link--social--${basic.current_party}`} target="_blank" href={`https://`+basic.domain}>
                    <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    );
}

LegislatorInfo.propTypes = {
    legislatorInfo: PropTypes.object.isRequired,
};

export default LegislatorInfo;
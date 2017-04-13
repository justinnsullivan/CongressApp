import React from 'react';
import PropTypes from 'prop-types';

const formatDate = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const arr = date.substr(0, 10).split('-');
    let day = months[parseInt(arr[1].replace(/^0+/, '')) - 1] + ' ' + parseInt(arr[2].replace(/^0+/, '')) + ', ' + arr[0];
    return day;
}

const BillInfo = ({ billInfo }) => {
    var extra = <p>No Votes</p>;
    if (billInfo && billInfo.votes.length !== 0){
        extra = <button onClick={this.alterRollCall.bind(this, billInfo.votes[0].roll_call, billInfo.votes[0].chamber)}>
                See Final Vote
                </button>
    }
    return(
        <div>
            <div className="bill-info__details">
                <div className="bill-info__title">
                    <div>
                        <p className="title--bill-info">{billInfo.number}</p>
                    </div>
                </div>
                <div className="bill-info__words">
                    <div className="title--sub2--bill-info">
                        Title 
                    </div>
                    <div className="title--sub1--bill-info">
                        {billInfo.title}
                    </div>
                    <div className="title--sub2--bill-info">
                        Last Action 
                    </div>
                    <div className="title--sub1--bill-info">
                        {billInfo.latest_major_action}
                    </div>
                </div>
                <div className="bill-info__words">
                    <div className="title--sub2--bill-info">
                        Sponsor 
                    </div>
                    <div className="title--sub1--bill-info">
                        {billInfo.sponsor} - {billInfo.sponsor_party} - {billInfo.sponsor_state}
                    </div>
                    <div className="title--sub2--bill-info">
                        Committee 
                    </div>
                    <div className="title--sub1--bill-info">
                        {billInfo.committees}
                    </div>
                </div>
            </div>
            <div className="bill-info__summary">
                <div className="title--sub2--bill-info">
                    Summary 
                </div>
                <div className="title--sub1--bill-info">
                    {billInfo.summary}
                </div>
            </div>

            <div className="bill-info__actions">
                <div className="title--sub2--bill-info">
                    Actions 
                </div>
                <div className="bill-info__actions__list">
                    {billInfo.actions.map((action, i) =>
                        <div key={i} className="bill-info__action">
                            {formatDate(action.datetime)} - {action.description}
                        </div>
                    )}
                </div>
            </div>
            <div className="bill-info__subjects">
                <div className="title--sub2--bill-info">
                    Subjects 
                </div>
                <div className="bill-info__subjects__list">
                    {billInfo.subjects.map((subject, i) =>
                        <p key={i} className='bill-info__subject'>{subject.name} </p>
                    )}
                </div>
            </div>
            {(billInfo && billInfo.votes.length !== 0) ? 
                <div className="bill-info__links">
                    <a className="bill-info__link--three" href={billInfo.congressdotgov_url}>
                        Learn More
                    </a>
                    <a className="bill-info__link--three" href={billInfo.gpo_pdf_uri}>
                        Read Bill
                    </a>
                    <a className="bill-info__link--three" href={billInfo.congressdotgov_url}>
                        Recent Vote
                    </a> 
                </div>
                :
                <div className="bill-info__links">
                    <a className="bill-info__link--two" href={billInfo.congressdotgov_url}>
                        Learn More
                    </a>
                    <a className="bill-info__link--two" href={billInfo.gpo_pdf_uri}>
                        Read Bill
                    </a>
                </div>
            }
        </div>
    );
}

BillInfo.propTypes = {
  	billInfo: PropTypes.object.isRequired,
};

export default BillInfo;

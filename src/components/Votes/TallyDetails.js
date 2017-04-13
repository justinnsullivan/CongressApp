import React from 'react';
import PropTypes from 'prop-types';

const TallyDetails = ({ vote }) => (
    <div className="tally__details">
        <div className="tally__title">
            <div>
                <p className="title--tally">{vote.question}</p>
            </div>
        </div>
        <div className="tally__words">
            <div className="title--sub2--tally">
                Description 
            </div>
            <div className="title--sub1--tally">
                {vote.description}
            </div>
            <div className="title--sub2--tally">
                Result 
            </div>
            <div className="title--sub1--tally">
                {vote.result}
            </div>
        </div>
        <div className="tally__small">
            <div className="title--sub2--tally">
                Chamber 
            </div>
            <div className="title--sub1--tally">
                {vote.chamber}
            </div>
            <div className="title--sub2--tally">
                Date 
            </div>
            <div className="title--sub1--tally">
                {vote.date}
            </div>
        </div>
        <div className="tally__small">
            <div className="title--sub2--tally">
                Number 
            </div>
            <div className="title--sub1--tally">
                {vote.congress}.{vote.session}.{vote.roll_call}
            </div>
            <a className="link--tally" href={vote.url}>
                Hear More
            </a>
        </div>
    </div>
);

TallyDetails.propTypes = {
  	vote: PropTypes.object.isRequired,
};

export default TallyDetails;
import React from 'react';
import PropTypes from 'prop-types';

const TallyNumbers = ({ vote }) => (
    <div className="tally__numbers">
        <div className="tally__totals">
            <div className="tally__totals--yes">
                Yes - {vote.total.yes}
            </div>
            <div className="tally__totals--no">
                No - {vote.total.no}
            </div>
            <div className="tally__totals--none">
                Abstain - {vote.total.not_voting}
            </div>
        </div>
        <div className="tally__breakdown">
            <div className="tally__breakdown--dem">
                <h4>Democrats</h4>
                <div>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.democratic.yes}</p>
                        <span>Yes</span>
                    </span>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.democratic.no}</p>
                        <span>No</span>
                    </span>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.democratic.not_voting}</p>
                        <span>Abstain</span>
                    </span>
                </div>
            </div>
            <div className="tally__breakdown--ind">
                <h4>Independent</h4>
                <div>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.independent.yes}</p>
                        <span>Yes</span>
                    </span>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.independent.no}</p>
                        <span>No</span>
                    </span>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.democratic.not_voting}</p>
                        <span>Abstain</span>
                    </span>
                </div>
            </div>
            <div className="tally__breakdown--rep">
                <h4>Republican</h4>
                <div>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.republican.yes}</p>
                        <span>Yes</span>
                    </span>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.republican.no}</p>
                        <span>No</span>
                    </span>
                    <span className="tally__breakdown__wrap">
                        <p>{vote.republican.not_voting}</p>
                        <span>Abstain</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
);

TallyNumbers.propTypes = {
  	vote: PropTypes.object.isRequired,
};

export default TallyNumbers;
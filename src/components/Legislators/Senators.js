import React from 'react';
import PropTypes from 'prop-types';

const Senators = ({ senators, onClick }) => (
    <div>
        <h3>Senators</h3>
        <ul>
            {senators.map((senator, i) =>
                <li key={i} onClick={onClick.bind(this, senator.bioguide_id)} >
                    {senator.last_name}
                    <img alt={`Senator ${senator.last_name}`} src={`http://vote-usa.org/Image.aspx?Id=${
                        senator.middle_name !== null ? 
                        senator.state+senator.last_name+senator.first_name+senator.middle_name.substring(0,1) :
                        senator.state+senator.last_name+senator.first_name
                    }`} />
                </li>,
	    	)}
        </ul>
    </div>
);

Senators.propTypes = {
  	senators: PropTypes.array.isRequired,
};

export default Senators;

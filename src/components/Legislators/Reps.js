import React from 'react';
import PropTypes from 'prop-types';

const Reps = ({ reps, onClick }) => (
  	<div>
		<h3>Representatives</h3>
		<ul>
		  	{reps.map((rep, i) =>
		    	<li key={i} onClick={onClick.bind(this, rep.bioguide_id)}>
		    		{rep.last_name}
		    		<img alt={`Rep ${rep.last_name}`} src={`http://vote-usa.org/Image.aspx?Id=${
                        rep.middle_name !== null ? 
                        rep.state+rep.last_name+rep.first_name+rep.middle_name.substring(0,1) :
                        rep.state+rep.last_name+rep.first_name
                    }`} />
		    	</li>
		    )}
		</ul>
  	</div>
);

Reps.propTypes = {
  	reps: PropTypes.array.isRequired,
};

export default Reps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactable';
import senateMap from '../../hard.json';


class Tally extends Component {
    static propTypes = {
        tally: PropTypes.object.isRequired
    };

    processTally = (voteTally) => {
        const tallyList = [];
        if (voteTally.length === 100){
            for (var i = 0; i < voteTally.length; i++) {
                const current = voteTally[i];
                const member_id = current['member_id'];
                const member_info = senateMap[member_id];
                const position = current['vote_position'];
                tallyList.push({
                    Name: `${member_info.first_name} ${member_info.last_name}`,
                    State: member_info.state,
                    Party: member_info.party,
                    Vote: position,
                });
            }
        }
        else {
            
        }
        return tallyList;
    }

    render() {
        const tallyList = this.processTally(this.props.tally.votes.vote.positions);
        return (

            <div>
                {(tallyList.length === 0) ? <p>hi!</p> :
                <Table className="table" data={tallyList} sortable defaultSort={{ column: 'State' }} />
                }
            </div>
        );
    }
}

export default Tally;

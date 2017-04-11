import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactable';
import senateMap from '../../hard.json';
import repMap from '../../soft.json';


class Tally extends Component {
    static propTypes = {
        tally: PropTypes.object.isRequired
    };

    processTally = (voteTally) => {
        const tallyList = [];

        var mapping = voteTally.length === 100 ? senateMap : repMap;

        for (var i = 0; i < voteTally.length; i++) {
            const current = voteTally[i];
            const member_id = current['member_id'];
            const member_info = mapping[member_id];
            const position = current['vote_position'];
            tallyList.push({
                Name: `${member_info.first_name} ${member_info.last_name}`,
                State: member_info.state,
                Party: member_info.party,
                Vote: position,
            });
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

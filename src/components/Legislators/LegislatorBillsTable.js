import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactable';


class LegislatorBillsTable extends Component {
    static propTypes = {
        bills: PropTypes.array.isRequired,
        party: PropTypes.string.isRequired
    };
    render() {
        const {bills, party} = this.props;
        return (
            <div  className={`table--bills--${party}`}>
                {(bills.length === 0) ? '':
                <Table data={bills} sortable defaultSort={{ column: 'Number' }} />
                }
            </div>
        );
    }
}

export default LegislatorBillsTable;

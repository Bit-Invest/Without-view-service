import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeDateFilter } from '@store/modules/terminal';

const ROOT_CLASS = 'terminal-date-filter'

class TerminalDateFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    changeDateFilter = (param) => {
        if (param !== this.props.dateFilterValue) {
            this.props.changeDateFilter(param)
        }
    }

    render() {
        return (
            <div className={ROOT_CLASS}>
                <div className={`${ROOT_CLASS}__block ${this.props.dateFilterValue === 'min' ? `${ROOT_CLASS}__active` : ''}`} onClick={() => this.changeDateFilter('min')}>
                    <span className={`${ROOT_CLASS}__value`}>1 MIN</span>
                </div>
                <div className={`${ROOT_CLASS}__block ${this.props.dateFilterValue === '30_min' ? `${ROOT_CLASS}__active` : ''}`} onClick={() => this.changeDateFilter('30_min')}>
                    <span className={`${ROOT_CLASS}__value`}>30 MIN</span>
                </div>
                <div className={`${ROOT_CLASS}__block ${this.props.dateFilterValue === 'hr' ? `${ROOT_CLASS}__active` : ''}`} onClick={() => this.changeDateFilter('hr')}>
                    <span className={`${ROOT_CLASS}__value`}>1 HR</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dateFilterValue: state.terminal.dateFilterValue
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({changeDateFilter}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TerminalDateFilter)
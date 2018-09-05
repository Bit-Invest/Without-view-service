import React, { Component } from 'react'
import { connect } from 'react-redux';
import { objectLangs, lng } from '../../../lngs/index'

const ROOT_CLASS = 'terminal-date-filter'

class TerminalDateFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={ROOT_CLASS}>
                <div className={`${ROOT_CLASS}__block ${this.props.dateFilterValue === '4_hour' ? `${ROOT_CLASS}__active` : ''}`} onClick={() => this.props.changeDateFilterValue('4_hour')}>
                    <span className={`${ROOT_CLASS}__value`}>{ objectLangs[lng]['TerminalDateFilter#1'] }</span>
                </div>
                <div className={`${ROOT_CLASS}__block ${this.props.dateFilterValue === '1_day' ? `${ROOT_CLASS}__active` : ''}`} onClick={() => this.props.changeDateFilterValue('1_day')}>
                    <span className={`${ROOT_CLASS}__value`}>{ objectLangs[lng]['TerminalDateFilter#2'] }</span>
                </div>
                <div className={`${ROOT_CLASS}__block ${this.props.dateFilterValue === '1_week' ? `${ROOT_CLASS}__active` : ''}`} onClick={() => this.props.changeDateFilterValue('1_week')}>
                    <span className={`${ROOT_CLASS}__value`}>{ objectLangs[lng]['TerminalDateFilter#3'] }</span>
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

export default connect(mapStateToProps)(TerminalDateFilter)